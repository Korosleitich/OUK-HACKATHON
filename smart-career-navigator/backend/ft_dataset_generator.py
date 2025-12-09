import json
import os


RESUMES_DIR = os.path.join('..', 'utils', 'sample_resumes')
OUT = 'training_dataset.jsonl'


TEMPLATE = lambda r, role, gaps, courses: {
'instruction': 'Analyze the resume and recommend a role, skill gaps and courses.',
'input': r,
'output': {
'role': role,
'skill_gaps': gaps,
'recommended_courses': courses
}
}


if __name__ == '__main__':
outpath = OUT
with open(outpath, 'w') as wf:
for f in os.listdir(RESUMES_DIR):
if not f.endswith('.txt'):
continue
txt = open(os.path.join(RESUMES_DIR, f)).read().strip()
rec = TEMPLATE(
txt,
'Junior Backend Developer',
['REST APIs', 'Docker', 'Testing'],
['REST API Design', 'Docker Basics', 'Unit Testing']
)
wf.write(json.dumps(rec) + '\n')
print('Wrote', outpath)