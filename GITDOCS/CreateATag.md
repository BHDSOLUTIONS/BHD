To create tag do the following:

- When you at a point to ready to mark a tag for your software
- do the regular git add., and git commit -m
- then to create a tag for a software version at this point do:
# git tag -a v1.1.rc1 -m " version 1.1.releasecandidate1"

- this will push all tags in
# git push --tags

- now you can do your regular push for your origin master
# git push -u origin master

- to show all tags - that you have on this software
# git tag

- to check out a tag version 
# git checkout v1.1.rc1

Remember :
The above command will checkout the v1.4 tag. This puts the repo in a detached HEAD state. 
This means any changes made will not update the tag. They will create a new detached commit. 
This new detached commit will not be part of any branch and will only be reachable directly by the commits SHA hash. 
Therefore it is a best practice to create a new branch anytime you're making changes in a detached HEAD state.
