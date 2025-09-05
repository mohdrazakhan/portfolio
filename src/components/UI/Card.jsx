import React from 'react'


export default function Card({ children, className='' }){
return (
<div className={`rounded-2xl border dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 ${className}`}>
{children}
</div>
)
}