// COPIED: the Description editor of PM › Create Issue (modules/project-mgmt/dom/yop_create_issue_form_empty_2026-10-07.html): rte-host › rte-outer ›
// rte-wrapper › rte-toolbar (its buttons and SVG icons pasted verbatim, ./rte-toolbar.html) › rte-editor-area › ".tiptap ProseMirror".
// Styles = the app's own editor CSS (_design-system/rte-editor.css → src/styles/rte-editor.css). BA 8 Oct (#18).
// DIVERGES: the real editor is Tiptap; here the same markup is a contentEditable box and the buttons call the browser's formatting commands
// (bold, italic, underline, strike, clear, align, lists, indent, code block, quote, divider). Heading, colours, link, table, emoji, voice and
// fullscreen are shown but do nothing (no new library, CLAUDE.md rule 6).
import { useEffect, useRef } from 'react'
import TOOLBAR from './rte-toolbar.html?raw'
import '../../styles/rte-editor.css'

const CMD = {
  'Bold (Ctrl+B)': ['bold'], 'Italic (Ctrl+I)': ['italic'], 'Underline (Ctrl+U)': ['underline'], 'Strikethrough': ['strikeThrough'], 'Clear formatting': ['removeFormat'],
  'Align left': ['justifyLeft'], 'Align center': ['justifyCenter'], 'Align right': ['justifyRight'], 'Ordered list': ['insertOrderedList'], 'Bullet list': ['insertUnorderedList'],
  'Decrease indent': ['outdent'], 'Increase indent': ['indent'], 'Code block': ['formatBlock', 'pre'], 'Blockquote': ['formatBlock', 'blockquote'], 'Insert Divider': ['insertHorizontalRule'],
}
const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export const textToHtml = (t) => (t || '').split('\n').map((l) => `<p>${esc(l) || '<br>'}</p>`).join('')

/** html = starting content (read once); onChange({ html, text }) on every edit */
export default function RichText({ html, onChange }) {
  const ed = useRef(null)
  useEffect(() => { if (ed.current) ed.current.innerHTML = html || '<p><br></p>' }, [])   // eslint-disable-line react-hooks/exhaustive-deps
  const emit = () => onChange?.({ html: ed.current.innerHTML, text: ed.current.innerText.replace(/\n{3,}/g, '\n\n').trim() })
  const run = (e) => {
    const b = e.target.closest('button'); if (!b) return
    e.preventDefault()                                   // keep the text selection in the editor
    const c = CMD[b.title]; if (!c) return
    ed.current.focus(); document.execCommand(c[0], false, c[1]); emit()
  }
  return (
    <div className="rte-host"><div className="rte-host"><div className="w-full relative rte-outer">
      <div className="rte-wrapper border-gray-300 m-0 [&_.ProseMirror]:min-h-[300px] relative">
        <div className="rte-toolbar" onMouseDown={run} dangerouslySetInnerHTML={{ __html: TOOLBAR }} />
        <div className="rte-editor-area"><div className="rte-editor-content-wrapper">
          <div ref={ed} contentEditable suppressContentEditableWarning role="textbox" translate="no" className="tiptap ProseMirror" tabIndex={0} onInput={emit} />
        </div></div>
      </div>
    </div></div></div>
  )
}
