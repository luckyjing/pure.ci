import db from '../../lib/db';

export default class ProjectOrm {
  static async list(user_id) {
    try {
      return db.query('SELECT * from project WHERE user_id = ?', [user_id]);
    } catch (error) {
      throw error;
    }
  }
  static async getIdByRepositoryUrl(url) {
    try {
      const resource = await db.query('SELECT * from project WHERE repository_url = ?', [url]);
      return resource[0];
    } catch (error) {
      throw error;
    }
  }
  static async jobList(project_id) {
    try {
      return db.query('SELECT * from job WHERE project_id = ? ORDER BY job.start_time DESC', [project_id]);
    } catch (error) {
      throw error;
    }
  }
  static async jobInfo(job_id) {
    try {
      const resource = await db.query('SELECT * from job WHERE id = ?', [job_id]);
      return resource[0];
    } catch (error) {
      throw error;
    }
  }
  static async createProject(id, name, repository_url, repository_name, user_id) {
    try {
      const params = {
        id,
        name,
        repository_url,
        repository_name,
        user_id
      }
      return db.query('INSERT INTO project SET ?', params);
    } catch (e) {
      throw e;
    }
  }
  static async getProjectInfo(project_id, user_id) {
    try {
      let data = await db.query('SELECT * FROM project WHERE id = ? AND user_id = ?', [project_id, user_id]);
      return data[0];
    } catch (error) {
      throw error;
    }
  }

  static async addWorkFlow(user_id, project_id, workflow) {
    try {
      return db.query("UPDATE project SET workflow = ? WHERE id = ? AND user_id = ?", [workflow, project_id, user_id]);
    } catch (e) {
      throw e;
    }
  }
  static async updateJob(job_id, workflow, status, duration) {
    try {
      return db.query('UPDATE job SET workflow = ? ,status = ?,duration = ? WHERE id = ?', [workflow, status, duration, job_id]);
    } catch (error) {
      throw error;
    }
  }
  static async createJob(job_id, workflow, project_id, commit_msg, branch, status) {
    let params = {
      id: job_id,
      workflow,
      project_id,
      commit_msg,
      branch,
      status
    }
    try {
      return db.query("INSERT INTO job SET ?", params);
    } catch (e) {
      throw e;
    }
  }
  static async deleteProject(project_id) {
    try {
      await db.query('DELETE FROM job WHERE project_id = ?', [project_id]);
      await db.query('DELETE FROM project WHERE id = ?', [project_id]);
    } catch (error) {
      throw error;
    }
  }
}
