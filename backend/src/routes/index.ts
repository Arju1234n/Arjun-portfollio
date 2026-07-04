import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimiter';

// ── Auth
import authRoutes from './auth.routes';

// ── Controllers
import * as projects   from '../controllers/projects.controller';
import * as content    from '../controllers/content.controller';
import * as contact    from '../controllers/contact.controller';
import * as media      from '../controllers/media.controller';
import * as blog       from '../controllers/blog.controller';
import * as analytics  from '../controllers/analytics.controller';

const router = Router();

// ── Auth
router.use('/auth', authRoutes);

// ── Public endpoints (no auth required)
router.post('/contact',              contactLimiter, contact.submitContact);
router.post('/analytics/pageview',   analytics.trackPageView);
router.get('/projects',              projects.listProjects);
router.get('/projects/featured',     projects.listFeaturedProjects);
router.get('/projects/slug/:slug',   projects.getPublishedProjectBySlug);
router.post('/projects/:id/view',    projects.incrementView);
router.get('/hero',                  content.getHero);
router.get('/about',                 content.getAbout);
router.get('/experience',            content.listExperience);
router.get('/skills',                content.listSkills);
router.get('/skills/categories',     content.listSkillCategories);
router.get('/education',             content.listEducation);
router.get('/certifications',        content.listCertifications);
router.get('/stats',                 content.listStats);
router.get('/blog',                  blog.listPosts);
router.get('/blog/:id',              blog.getPost);

// ── Resume — active resume is public
router.get('/resume',                media.listResumes);
router.post('/resume/:id/download',  media.trackDownload);

// ── Admin-only endpoints
router.use(authenticate);

// Projects (write)
router.post('/projects',             authorize('admin','super_admin'), projects.createProject);
router.post('/projects/reorder',     authorize('admin','super_admin'), projects.reorderProjects);
router.get('/projects/:id',          projects.getProject);
router.put('/projects/:id',          authorize('admin','super_admin','editor'), projects.replaceProject);
router.patch('/projects/:id',        authorize('admin','super_admin','editor'), projects.updateProject);
router.patch('/projects/:id/publish', authorize('admin','super_admin','editor'), projects.publishProject);
router.patch('/projects/:id/draft',  authorize('admin','super_admin','editor'), projects.draftProject);
router.patch('/projects/:id/featured', authorize('admin','super_admin','editor'), projects.toggleFeaturedProject);
router.post('/projects/:id/cover-image', authorize('admin','super_admin','editor'), projects.uploadCoverMiddleware, projects.uploadCoverImage);
router.post('/projects/:id/gallery-images', authorize('admin','super_admin','editor'), projects.uploadGalleryMiddleware, projects.uploadGalleryImages);
router.delete('/projects/:id',       authorize('admin','super_admin'), projects.deleteProject);

// Content (write)
router.patch('/hero',                authorize('admin','super_admin'), content.updateHero);
router.patch('/about',               authorize('admin','super_admin'), content.updateAbout);

router.post('/experience',           authorize('admin','super_admin'), content.createExperience);
router.post('/experience/reorder',   authorize('admin','super_admin'), content.reorderExperience);
router.patch('/experience/:id',      authorize('admin','super_admin','editor'), content.updateExperience);
router.delete('/experience/:id',     authorize('admin','super_admin'), content.deleteExperience);

router.post('/skills/categories',    authorize('admin','super_admin'), content.createSkillCategory);
router.patch('/skills/categories/:id', authorize('admin','super_admin'), content.updateSkillCategory);
router.delete('/skills/categories/:id', authorize('admin','super_admin'), content.deleteSkillCategory);

router.post('/skills',               authorize('admin','super_admin','editor'), content.createSkill);
router.post('/skills/reorder',       authorize('admin','super_admin'), content.reorderSkills);
router.patch('/skills/:id',          authorize('admin','super_admin','editor'), content.updateSkill);
router.delete('/skills/:id',         authorize('admin','super_admin'), content.deleteSkill);

router.post('/education',            authorize('admin','super_admin'), content.createEducation);
router.patch('/education/:id',       authorize('admin','super_admin','editor'), content.updateEducation);
router.delete('/education/:id',      authorize('admin','super_admin'), content.deleteEducation);

router.post('/certifications',       authorize('admin','super_admin'), content.createCertification);
router.post('/certifications/reorder', authorize('admin','super_admin'), content.reorderCertifications);
router.patch('/certifications/:id',  authorize('admin','super_admin','editor'), content.updateCertification);
router.delete('/certifications/:id', authorize('admin','super_admin'), content.deleteCertification);

router.post('/stats',                authorize('admin','super_admin'), content.createStat);
router.patch('/stats/:id',           authorize('admin','super_admin'), content.updateStat);
router.delete('/stats/:id',          authorize('admin','super_admin'), content.deleteStat);

// Blog (write)
router.post('/blog',                 authorize('admin','super_admin','editor'), blog.createPost);
router.patch('/blog/:id',            authorize('admin','super_admin','editor'), blog.updatePost);
router.delete('/blog/:id',           authorize('admin','super_admin'), blog.deletePost);

// Contact (admin)
router.get('/contact/messages/export',           authorize('admin','super_admin'), contact.exportMessages);
router.get('/contact/messages',                  authorize('admin','super_admin'), contact.listMessages);
router.patch('/contact/messages/:id/read',       authorize('admin','super_admin'), contact.markRead);
router.post('/contact/messages/:id/reply',       authorize('admin','super_admin'), contact.replyMessage);
router.delete('/contact/messages/:id',           authorize('admin','super_admin'), contact.deleteMessage);

// Resume (admin)
router.post('/resume/upload',                    authorize('admin','super_admin'), media.uploadMiddleware, media.uploadResume);
router.patch('/resume/:id/activate',             authorize('admin','super_admin'), media.activateResume);
router.delete('/resume/:id',                     authorize('admin','super_admin'), media.deleteResume);

// Media
router.post('/media/upload',                     authorize('admin','super_admin','editor'), media.uploadMiddlewares, media.uploadMedia);
router.get('/media',                             media.listMedia);
router.delete('/media/:id',                      authorize('admin','super_admin'), media.deleteMedia);

// Analytics & Settings
router.get('/analytics/summary',                 authorize('admin','super_admin'), analytics.getSummary);
router.get('/settings',                          authorize('admin','super_admin'), analytics.getSettings);
router.patch('/settings',                        authorize('admin','super_admin'), analytics.updateSettings);
router.get('/activity',                          authorize('admin','super_admin'), analytics.listActivity);

export default router;
