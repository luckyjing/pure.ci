import _ from 'lodash'
import WorkFlow from './workflow'
import Job from './job'

class Project {
  constructor(name, repository) {
    this.id = _.uniqueId();
    this.name = name;
    this.repository = repository;
    this.workFlow = [];
    this.jobList = [];
  }

  setWorkFlow(workflow) {
    this.workFlow = workflow;
  }

  addNewWorkFlow(workflow) {
    this.workFlow.push(workflow);
  }

  setJob(job) {
    this.job = job;
  }

  createJob() {
    let newJob = new Job();
    this.job.push(newJob)
  }

  run() {
    this.createJob();
  }
}