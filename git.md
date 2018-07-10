# git 指令

#### git 安装配置

我是在Windows下操作 ，所以这里展现的是Windows下的安装，下载安装包安装，安装包下载地址： http://msysgit.github.io/ ；完成安装之后，就可以使用命令行的 git 工具（已经自带了 ssh 客户端）了，

#### git工作流程

一般工作流程如下：

- 克隆 Git 资源作为自己的工作目录。
- 在克隆的资源上添加或修改文件，也可对分支进行增删改查操作。
- 如果其他人修改了，你可以更新资源。
- 添加要修改的文件到缓存区，并查看状态，在进行提交文件
- 在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

#### git相关指令

1. ###### get clone

   克隆仓库的命令格式为：

   ```python
   git clone <repo>
   ```

   例如：

   ```gas
   Administrator@WIN7-20150516RS MINGW64 /f/workspace
   $ git clone git@github.com:Lqq520/notes.git
   ```

在git  bash here 里 ctrl+insert为复制，shift+insert为粘贴

2. ###### git status

用于查看项目的当前状态。

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        django.txt

nothing added to commit but untracked files present (use "git add" to track)
```

这里显示的是 我前面更改了一个文件，我增加了一个名为django.txt的文件。但是这个文件是出于还未提交的 状态为红色的。稍后我们可以进行提交操作。

3. ###### git branch

用于查看分支状态

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git branch
* master
```

当前文件下的分支有master

4. ###### git checkout -b  分支名

在当前文件下创建新的分支

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git checkout -b lq
Switched to a new branch 'lq'

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (lq)
$ git branch
* lq
  master
```

当我们查看分支时 ，就出现了新的分支lq，并且我们处于分支lq下。

5. ###### git checkout 分支名

切换到当前分支

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (lq)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$
```



如果存在多个分支情况下，我们在不同分支下写的是不同的代码，所以需要用到切换分支这一概念。

6. ###### git branch-D 分支名

删除当前分支

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (lq)
$ git branch -D lq
error: Cannot delete branch 'lq' checked out at 'F:/workspace/notes'

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (lq)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git branch -D lq
Deleted branch lq (was 9b9d6f0).

```

这里显示删除时出现了错误，是因为你在当前分之下删除当前分支这样是不行的，要退出当前信息，在进行删除分支，这样就可以了，然后我们在查看当前分支，就不存在 lq分支了

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git branch -D lq
Deleted branch lq (was 9b9d6f0).
```

7. git add 分支名

添加修改的分支到缓存区,在这之前需要查看一下git状态，查看哪些文件没有添加到修改

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   django.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

这时modified：django.txt为红色的 是还未提交修改的状态，然后我们来提交修改

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git add *

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   django.txt

```

8. ###### git commit -m ‘注解’

  提交修改到本地分支

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git commit -m 'django'
[master 94edbeb] django
 1 file changed, 4 insertions(+)

```

9. ###### git commit -am ‘’

合并add和commit操作,如果你不想分开执行添加修改和提交修改，那也可以一起执行。

10. ######git push origin 分支名

提交本地分支到远程分支上,这就是完整的将自己的仓库文件提交到GitHub中了。你可以任意的修改本地的仓库，然后进行相关操作，修改到远程分支。

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git push origin master
warning: redirecting to https://github.com/Lqq520/test1.git/
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 354 bytes | 177.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
remote: This repository moved. Please use the new location:
remote:   https://github.com/Lqq520/notes.git
To http://github.com/Lqq520/test1.git
   e0d3080..94edbeb  master -> master
```

11. ######设置全局变量

    可以进行git用户名或者或者邮箱的设置，这样运维可以看见你的用户名

    ```
    设置git邮箱
    git config --global user.email "sss@qq.com"
    设置git用户名
    git config --global user.name "69"
    查看git配置信息
    git config --list
    查看git用户名
    git config user.name
    查看邮箱配置
    git config user.email
    ```

12. ######创建秘钥

查看是否存在ssh keys，进入到  /.ssh文件下  进行查看

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$  cd ~/.ssh

Administrator@WIN7-20150516RS MINGW64 ~/.ssh
$ ls
id_rsa  id_rsa.pub  known_hosts
```

关键是看有没有用 `something` 和 `something.pub` 来命名的一对文件，这个 `something` 通常就是 `id_dsa` 或 `id_rsa`。有 `.pub`后缀的文件就是公钥，另一个文件则是密钥。假如没有这些文件，或者干脆连 `.ssh` 目录都没有，可以用 `ssh-keygen` 来创建。

```gas
$ ssh-keygen -t rsa -C "your_email@youremail.com"

Administrator@WIN7-20150516RS MINGW64 ~/.ssh
$ ssh-keygen -t rsa -C "your_email@youremail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa):
/c/Users/Administrator/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Administrator/.ssh/id_rsa.
Your public key has been saved in /c/Users/Administrator/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:tdECjs4JA5xAL+b32R+PzSb2k25XHbwUx0iknWP3qOQ your_email@youremail.com
The key's randomart image is:
+---[RSA 2048]----+
|o+..    .    ooo |
|  +.   o . . o.oo|
| o .o . . + o * +|
|o .  = . . + . B.|
| . .  + S . . o =|
|  . . o    o . o.|
|     o . .  E .  |
|        .o*= .   |
|        .o**o    |
+----[SHA256]-----+
```

这里因为我之前已经创建了，所以就选择把之前的覆盖了，密码可以选择不输入，一直按enter就可以

13. ######分支间的操作

```gas
 比较分支之间的不同
 git diff 分支1 分支2
 合并分支
 git merge 分支
 在合并时要在当前分支合并另一分支
 Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git merge lq
Already up to date.
```

14. ###### 删除远程分支

git push origin --delete 分支

```gas
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git push origin --delete lq
warning: redirecting to https://github.com/Lqq520/test1.git/
remote: This repository moved. Please use the new location:
remote:   https://github.com/Lqq520/notes.git
To http://github.com/Lqq520/test1.git
 - [deleted]         lq
```



15. ###### tag标签

```gas
 打tag标签
 git tag -a 版本号 -m 注解

 推送版本
 git push origin 版本号

 查看版本号
 git tag 

 删除版本号
 git tag -d 版本号

 删除远程版本号
 push origin --delete tag 版本号
 
 
Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git tag -a v10 -m 'tag'

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git push origin v10
warning: redirecting to https://github.com/Lqq520/test1.git/
Counting objects: 1, done.
Writing objects: 100% (1/1), 154 bytes | 77.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0)
remote: This repository moved. Please use the new location:
remote:   https://github.com/Lqq520/notes.git
To http://github.com/Lqq520/test1.git
 * [new tag]         v10 -> v10

Administrator@WIN7-20150516RS MINGW64 /f/workspace/notes (master)
$ git tag
v10
```

16. git 储藏（stash）

经常有这样的事情发生，当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作。问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。解决这个问题的办法就是`git stash`命令。

```
缓存修改的代码
git stash

要查看现有的储藏
git stash list

 还原储藏
 git stash apply stash@{x}
 
 移除储藏
 git stash drop  stash@{x}
 
 重新运用储藏
  git stash pop stash@{x}

```




