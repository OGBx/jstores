'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function ThemeToggle(){const [dark,setDark]=useState(false);useEffect(()=>{setDark(document.documentElement.classList.contains('dark'))},[]);return <button aria-label="Toggle dark mode" className="rounded-full border border-stone-200 p-2 dark:border-white/15" onClick={()=>{const n=!dark;setDark(n);document.documentElement.classList.toggle('dark',n);localStorage.setItem('theme',n?'dark':'light')}}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>}
