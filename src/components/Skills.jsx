import React from 'react'
import skills from '../data/skills'
import Card from './UI/Card'


export default function Skills(){
return (
<section id="skills" className="py-16">
<div className="mx-auto max-w-6xl px-4">
<div className="flex items-center justify-between">
<h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
</div>
<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
{skills.map(s => (
<Card key={s} className="p-4 text-center">
<div className="font-medium">{s}</div>
</Card>
))}
</div>
</div>
</section>
)
}