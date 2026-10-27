import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const base=JSON.parse(await fs.readFile(new URL('./clinical-preservation.json',import.meta.url),'utf8'));
const hash=v=>crypto.createHash('sha256').update(v).digest('hex');
export function preserved(env,kind,skip=[]){const exclude=new Set([...(env.ctx.NeuroModuleReview?.ids||[]),...skip]);if(kind==='education')return Object.entries(base.education).filter(([,x])=>!exclude.has(x.module)).every(([id,x])=>hash(env.eval('JSON.stringify(EDUCATION_V2['+JSON.stringify(id)+'])'))===x.hash);if(kind==='copy')return Object.entries(base.patientCopy).filter(([id])=>!exclude.has(id)).every(([id,h])=>hash(env.eval('JSON.stringify(NEURO_DATA['+JSON.stringify(id)+'].questions.map(q=>[q.id,PATIENT_INTAKE_COPY.questions[q.id]]))'))===h);return Object.entries(base.modules).filter(([id])=>!exclude.has(id)).every(([id,h])=>hash(env.eval('JSON.stringify(NEURO_DATA['+JSON.stringify(id)+'])'))===h);}
export {base,hash};
