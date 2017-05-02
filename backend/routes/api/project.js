import Router from 'koa-router';
import * as projectController from '../../controller/projectController';
const router = new Router();

router.get('/', projectController.projectList);
router.post('/', projectController.initProject);

router.post('/workflow', projectController.addWorkFlow);

router.get('/:project_id', projectController.projectInfo)
router.delete('/:project_id', projectController.deleteProject)

router.get('/:project_id/job', projectController.jobList);
router.post('/:project_id/job', projectController.createJob);

router.get('/:project_id/job/:job_id', projectController.jobInfo);
router.get('/:project_id/job/:job_id/status', projectController.jobStatus);

export default router;