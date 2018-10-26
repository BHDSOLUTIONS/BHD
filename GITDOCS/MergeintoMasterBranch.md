You need to merge your current branch into the master branch. the way to do it is:
Get all branches from server
# git fetch origin  

Update your local master to the origin master, in case master has changed upstream
# git rebase master

 Go to your branch
# git checkout <branch> 

    At this point - you are in your branch -
    Make modifications to the code that you want to merge
    into master.
    Remember to do - git add . , and git commit -m "" ,
    after you make modifications to your code. 


Rebase your branch to master; applies your branch's changes ontop of the master, where it diverged
# git rebase master 

Go back to master
# git checkout master 

Merge your branch into master.  since you rebased, this should be trivial
# git merge <branch> 

Push your master upstream
# git push 

- Last step , check to see if your new code is in the master code.

