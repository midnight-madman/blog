---
title: 'My Obsidian Beginner Setup'
publishedAt: '2023-01-05'
summary: 'Short overview of my Obsidian setup after my first four weeks of daily use'
tag: '🚀 Popular'
---

# My Obsidian Beginner Setup
## Overview

I started to use [Obsidian](https://obsidian.md) a month ago with my first 170 word note. I've kept a daily routine for most of the last six weeks. 

## Where am I coming from
Skip this if you don't care about the historical migration of my notes. I understand.

Over the last years I tried several apps to journal regularly and organize quotes and passages from books. I've migrated between them several times from Apple Notes.app to Bear to iA Writer and back. The basic Notes app by Apple ended up to be always available and lowest friction for most things. I ended up with a ton of notes without any structure and a lot repetition. 

I'm not deep into the [Second Brain](https://lordnote.com/what-is-second-brain/) hype, but went through tutorials and applied basic guidelines to end up with my setup. This was a helpful foundation to build on and quickly create a productive environment. 

## Goals
- Small upfront time investment get going
	- Avoid creating a full-blown setup, but not using it
- Make note-taking available across devices
- Make daily journaling as simple as possible
	- Create a simple daily note format

## Steps
- Create first folder structure based on the [PARA-Method](https://www.lucapallotta.com/para/)
- Link [Readwise](https://readwise.io/) highlights into Resources (see Plugins below)
- Create daily template and use it
- Ongoing: fine-tune templates and create new topics and links between them whenever I stumble upon it
	- No additional 

# Plugins

Obsidian is great right after installation. I didn't want to waste time to fine-tune, so installed the Minimal theme and these four plugins:

- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin)
	- Basic plugin to get a calendar in the sidebar 📆👀
- [Readwise](https://github.com/readwiseio/obsidian-readwise)
	- Organizes all my notes and highlights from books/articles into separate files. I've been using [Readwise](https://readwise.io/) for highlights for a while. Obsidian makes it easy to link authors and  create quotes. I already found it helpful to link books that I'm currently reading and work with highlights that I started to forget  
- [Templater](https://github.com/SilentVoid13/Templater)
	- lets you insert variables and functions into your notes
	- I use it for the link between daily notes
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
	- Pull data from notes into structure tables, see example of Habit Tracking below


# Daily Note Template
![[2023-01-01-Daily-Template.png]]

![[2023-01-01-Evening-Journaling.png]]

Here is the raw text you can copy and adapt:
```
---
habits:
  meditate: 0
  workout: no [mins/type]
  cold-exposure: no
metrics:
  coffee: 0
---
Location: 
People: 
Tags: #journal 

<< [[<% tp.date.now("YYYY-MM-DD", -1) %>]] | [[<% tp.date.now("YYYY-MM-DD", 1) %>]] >>

---
## Journal


---
## Evening
Every hindrance became a chance to adapt. Setbacks provide valuable lessons. 

- What am I grateful for today?
- What did I learn today? 
- What could I do better?
- What was the highlight of your day? What did you achieve today?
- Did I take advantage of today? Was this day filled with enough enjoyment and satisfaction?

---
## Tomorrow
- What are you excited, scared, hopeful about tomorrow?

```

# Habit Tracking

I want to visually see streaks and breaks in positive daily habits I'm tracking. The usual paid apps on iOS bring little value for my goals. I created a simple habit tracker based on the above daily template. This is the most straightforward solution I could find.

![[Screenshot 2023-01-04 at 17.26.01.png]]
Dataview creates a running list of my daily habit entries from the current month.

The dataview snippet to create it is:
```dataview
TABLE 
choice(habits.meditate & !contains(["0", "no"], habits.meditate), "✅ (" + habits.meditate + ")", "❌") AS "Meditate 🧘🏽‍♂️",
choice(habits.workout & !contains(["no", "0", "no [mins/type]"], habits.workout), "✅ (" + habits.workout +")", "❌") AS "Workout 🏋🏽‍♀️🏃🏽‍♂️",
choice(habits.cold-exposure & habits.cold-exposure != "no", "✅", "❌") AS "Cold Exposure 🥶"
FROM "Journal" and #journal 
WHERE file.name != "Daily Template" AND date(file.name) > date("2022-12-24")
SORT date(file.name) DESC
```