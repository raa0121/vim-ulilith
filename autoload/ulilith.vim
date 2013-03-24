"=============================================================================
" FILE: ulilith.vim
" Original FILE: itunes.js
" Original FILE URL: https://github.com/ryutorion/vim-itunes/blob/master/autoload/itunes.vim
" Modified Auther: raa0121 <raa0121@gmail.com>
" Version: 0.1
"=============================================================================

if !has('win32') && !has('win64')
  finish
endif
let s:save_cpo = &cpo
set cpo&vim

let V = vital#of('vim-ulilith')
let P = V.import('Process')

let s:path = expand('<sfile>:p:h') . '/ulilith.js'
function! s:request_to_ulilith(request)
  if P.has_vimproc()
    call vimproc#system_bg("cscript.exe " . substitute(s:path, '\\', '/', 'g') . ' ' . a:request)
  else
    call system("cscript " . substitute(s:path, '/', '\\', 'g') . ' ' . a:request)
  endif

endfunction

function! ulilith#play() "{{{
  call s:request_to_ulilith('play')
endfunction "}}}

function! ulilith#stop() "{{{
  call s:request_to_ulilith('stop')
endfunction "}}}

function! ulilith#next() "{{{
  call s:request_to_ulilith('next')
endfunction "}}}

function! ulilith#prev() "{{{
  call s:request_to_ulilith('prev')
endfunction "}}}

function! ulilith#pause() "{{{
  call s:request_to_ulilith('pause')
endfunction "}}}

function! ulilith#repeat() "{{{
  call s:request_to_ulilith('repeat')
endfunction "}}}

function! ulilith#loop() "{{{
  call s:request_to_ulilith('loop')
endfunction "}}}

function! ulilith#volume_up(value) "{{{
  call s:request_to_ulilith('volume_up '. a:value)
endfunction "}}}

function! ulilith#volume_down(value) "{{{
  call s:request_to_ulilith('volume_down '. a:value)
endfunction "}}}

let &cpo = s:save_cpo
unlet s:save_cpo

" vim: foldmethod=marker
