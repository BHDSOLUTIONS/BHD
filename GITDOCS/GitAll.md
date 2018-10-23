 git config --global user.name ""
 git config --global user.email
 
 touch .gitignore
 
 git --version

git config --help

git help config
git add --help

git init ( start watching a dir )
to stop watching ( rm -rf .git )- that will remove watching this dir

git status
touch .gitignore

-- ignore some files
add these file to .gitignore file
*.py -- will ignore all file ended with .py

-- add all files into staging area

git reset calc.py   -- only calc.py is not in staging area

git reset -- all files will not be in staging area

git add -A ( add current dir into watchlist)

git log -- show last commit

git clone <url > < where to clone>

git remote -v 
git branch -a

-- steps
git checkout master

git add -A

git commit -m ""

git diff

git status

git pull origin master ( pulling files from remote- pulling in new changes

git push origin master ( pushing changes into remote )


=======

git branch cald-divide ( create a branch )

git branch ( show all branch)

git checkout calc-divide

git add -A

git commit -m " divide"

git push -u origin calc-divide  ( push branch calc-divide into remote )

git branch -a ( show all branches )

=============================

git checkout master

git pull origin master

git branch --merged ( to show )

git merge calc-divide ( merging calc-divide branch)

git push origin master

===================

delete a branch
git bracnh --merged ( to show )

git branch -d calc-divide
 git branch -a

git push origin --delete calc-divide ( delete branch from origin)


=======================
steps to merge a branch into master

git checkout master
git pull origin master
git branch --merged

git merge calc-divide ( merging )

git push origin  master

===========================

 git FLOW

 git branch substract

 git checkout substract

 git status

 git add -A ( add to staging)

 git commit -m " substract "

 git push -u origin substract

 git pull origin master

 git merge substract

 git push origin master


 -- now delete the substract branch



