# Rules for this job (written by free_worker.py; OpenCode reads this file by itself)
- Copy every tag, class string, label and link exactly as it is in the source files. Never invent, rename, shorten or reformat a class.
- Files here can be large. Never print a whole large file: use grep -n, then sed -n 'START,ENDp' for the lines you need.
- If LIBRARY-INDEX.md exists, grep it first to choose files; open only the files you chose.
- Make small edits with the edit tool. Never rewrite a whole large file to change a few lines.
- Create your output files early, then improve them step by step: a half-done output is better than none when time runs out.
- Do not keep exploring once you have what a step needs; build that step, then go to the next.
- Write helper scripts only when grep and sed are not enough.
- Finish with the reply line TASK.md asks for.
