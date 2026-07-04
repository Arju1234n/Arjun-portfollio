import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience';
import { Skill, SkillCategory } from '../models/Skill';
import { Education } from '../models/Education';
import { Certification } from '../models/Certification';
import { HeroContent, AboutContent, Stat } from '../models/Content';
import { AppError } from '../middleware/error';

// ── Generic CRUD helpers ────────────────────────────────────────────────────

async function crudList(Model: any, req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Model.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

async function crudCreate(Model: any, req: Request, res: Response, next: NextFunction) {
  try {
    const count = await Model.countDocuments();
    const item  = await Model.create({ displayOrder: count, ...req.body });
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
}

async function crudUpdate(Model: any, req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return next(new AppError('Not found', 404));
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

async function crudDelete(Model: any, req: Request, res: Response, next: NextFunction) {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return next(new AppError('Not found', 404));
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}

async function crudReorder(Model: any, req: Request, res: Response, next: NextFunction) {
  try {
    const { order }: { order: { id: string; displayOrder: number }[] } = req.body;
    await Promise.all(order.map(({ id, displayOrder }) => Model.findByIdAndUpdate(id, { displayOrder })));
    res.json({ success: true });
  } catch (err) { next(err); }
}

// ── Experience ───────────────────────────────────────────────────────────────
export const listExperience   = (r: Request, s: Response, n: NextFunction) => crudList(Experience, r, s, n);
export const createExperience = (r: Request, s: Response, n: NextFunction) => crudCreate(Experience, r, s, n);
export const updateExperience = (r: Request, s: Response, n: NextFunction) => crudUpdate(Experience, r, s, n);
export const deleteExperience = (r: Request, s: Response, n: NextFunction) => crudDelete(Experience, r, s, n);
export const reorderExperience= (r: Request, s: Response, n: NextFunction) => crudReorder(Experience, r, s, n);

// ── Skills ───────────────────────────────────────────────────────────────────
export const listSkillCategories  = (r: Request, s: Response, n: NextFunction) => crudList(SkillCategory, r, s, n);
export const createSkillCategory  = (r: Request, s: Response, n: NextFunction) => crudCreate(SkillCategory, r, s, n);
export const updateSkillCategory  = (r: Request, s: Response, n: NextFunction) => crudUpdate(SkillCategory, r, s, n);
export const deleteSkillCategory  = (r: Request, s: Response, n: NextFunction) => crudDelete(SkillCategory, r, s, n);

export async function listSkills(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { categoryId } : {};
    const skills = await Skill.find(filter).sort({ displayOrder: 1 }).populate('categoryId', 'name emoji color');
    res.json({ success: true, data: skills });
  } catch (err) { next(err); }
}
export const createSkill  = (r: Request, s: Response, n: NextFunction) => crudCreate(Skill, r, s, n);
export const updateSkill  = (r: Request, s: Response, n: NextFunction) => crudUpdate(Skill, r, s, n);
export const deleteSkill  = (r: Request, s: Response, n: NextFunction) => crudDelete(Skill, r, s, n);
export const reorderSkills= (r: Request, s: Response, n: NextFunction) => crudReorder(Skill, r, s, n);

// ── Education ────────────────────────────────────────────────────────────────
export const listEducation   = (r: Request, s: Response, n: NextFunction) => crudList(Education, r, s, n);
export const createEducation = (r: Request, s: Response, n: NextFunction) => crudCreate(Education, r, s, n);
export const updateEducation = (r: Request, s: Response, n: NextFunction) => crudUpdate(Education, r, s, n);
export const deleteEducation = (r: Request, s: Response, n: NextFunction) => crudDelete(Education, r, s, n);

// ── Certifications ───────────────────────────────────────────────────────────
export const listCertifications   = (r: Request, s: Response, n: NextFunction) => crudList(Certification, r, s, n);
export const createCertification  = (r: Request, s: Response, n: NextFunction) => crudCreate(Certification, r, s, n);
export const updateCertification  = (r: Request, s: Response, n: NextFunction) => crudUpdate(Certification, r, s, n);
export const deleteCertification  = (r: Request, s: Response, n: NextFunction) => crudDelete(Certification, r, s, n);
export const reorderCertifications= (r: Request, s: Response, n: NextFunction) => crudReorder(Certification, r, s, n);

// ── Stats ────────────────────────────────────────────────────────────────────
export const listStats   = (r: Request, s: Response, n: NextFunction) => crudList(Stat, r, s, n);
export const createStat  = (r: Request, s: Response, n: NextFunction) => crudCreate(Stat, r, s, n);
export const updateStat  = (r: Request, s: Response, n: NextFunction) => crudUpdate(Stat, r, s, n);
export const deleteStat  = (r: Request, s: Response, n: NextFunction) => crudDelete(Stat, r, s, n);

// ── Hero (singleton) ─────────────────────────────────────────────────────────
export async function getHero(req: Request, res: Response, next: NextFunction) {
  try {
    let hero = await HeroContent.findOne();
    if (!hero) hero = await HeroContent.create({});
    res.json({ success: true, data: hero });
  } catch (err) { next(err); }
}
export async function updateHero(req: Request, res: Response, next: NextFunction) {
  try {
    let hero = await HeroContent.findOne();
    if (!hero) hero = await HeroContent.create({});
    const updated = await HeroContent.findByIdAndUpdate(
      hero._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}

// ── About (singleton) ────────────────────────────────────────────────────────
export async function getAbout(req: Request, res: Response, next: NextFunction) {
  try {
    let about = await AboutContent.findOne();
    if (!about) about = await AboutContent.create({});
    res.json({ success: true, data: about });
  } catch (err) { next(err); }
}
export async function updateAbout(req: Request, res: Response, next: NextFunction) {
  try {
    let about = await AboutContent.findOne();
    if (!about) about = await AboutContent.create({});
    const updated = await AboutContent.findByIdAndUpdate(
      about._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}
