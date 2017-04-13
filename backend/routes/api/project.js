import Router from 'koa-router';
import * as projectController from '../../controller/projectController';
const router = new Router();

router.get('/project', projectController.projectList);
router.get('/project/:project_id', projectController.projectInfo)
router.post('/project', projectController.initProject);

router.post('/project/workflow', projectController.addWorkFlow);

router.get('/project/:project_id/job', projectController.jobList);
router.get('/project/:project_id/job/:job_id', projectController.jobInfo);
router.get('/project/:project_id/job/:job_id/status', projectController.jobStatus);

export default router;