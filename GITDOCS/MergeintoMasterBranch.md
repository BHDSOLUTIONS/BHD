You need to merge your current branch into the master branch. the way to do it is:
# 1) git fetch origin  # get all branches from server  
# 2) git rebase master # update your local master to the origin master, in case master has changed upstream
# 3) git checkout <branch>  # go to your branch

    At this point - you are in your branch -
    Make modifications to the code that you want to merge
    into master.
    Remember to do - git add . , and git commit -m "" ,
    after you make modifications to your code. 


# 4) git rebase master # rebase your branch to master; applies your branch's changes ontop of the master, where it diverged
# 5) git checkout master # go back to master
# 6) git merge <branch> # merge your branch into master.  since you rebased, this should be trivial
# 7) git push # push your master upstream

# -Last step , check to see if your new code is in the master code.

