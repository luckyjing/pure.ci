import db from '../lib/db';

export async function addTask(key, name, description, option) {
  try {
    const params = {
      key,
      name,
      description,
      config: JSON.stringify(option)
    }
    return await db.query("INSERT INTO task SET ?", params);
  } catch (e) {
    throw e;
  }
}