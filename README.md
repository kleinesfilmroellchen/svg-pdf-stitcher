# svg-pdf-stitcher
Puppeteer-based script to stitch together SVG files into nice PDFs.

This is a node thing, because it depends on Puppeteer to use headless Chromium for rendering and PDF export. Yes, I hate JavaScript as well, yes, NodeJS is a bad idea. This is the only way to do it.

Technically, this script supports all types of images a normal browser can display. I haven't tried non-SVG, however

The resulting PDFs are always rasterized, even though SVGs are vector graphics. There is no way around this; PDF exports on LibreOffice draw with imported SVGs yield similar results. As opposed to other methods, however, SVG glitches are unlikely to occur because an actual browser is used to render them.

## Command line arguments and functionality

There should be help output with `--help`. Determine the output file with `--out`. Additional arguments are interpreted as SVG source files. They are output to the PDF files in the specified order, and vertically scaled to (approximately, fuck CSS/HTML and SVG scaling) the page size. The paper format is A4 portrait, and while you can change that, good luck adjusting the three inter-dependent variables.

## Final words

I made this in a sleepless night two days before christmas because I needed a method of stitching together the SVG exports from my Microsoft Whiteboard. I needed a PDF for university exercise submissions, and I had MS Whiteboard scribbles because I used a graphic tablet for my exercises (some courses force hand-written solutions) and no other free vector-based drawing program can handle a multi-monitor setup and correct pen input. Krita is unusable because of the lack of dynamic page size/multi-page support. Fuck you, GTK, get this fixed already! Both Inkscape and Xournal++ (my preferred program, if it worked) suffer from this because GTK is too stupid to just accept Windows Ink input and MAP IT TO THE SCREEN THAT WINDOWS TELLS IT THAT IT BELONGS TO, INSTEAD OF THE ENTIRE MONITOR SPACE. You suck, GTK.

(`</rant>`)

What I really want to say is that you shouldn't use this for anything ever, at all. I'm putting this out here if someone wants to have a laugh at the terrible JS I hacked together in three hours.
