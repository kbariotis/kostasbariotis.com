---
title: "VagrantUp : your distributed development environment"
path: "/vagrantup-your-distributed-development-environment/"
date: "2013-08-31T07:12:09.000Z"
date_updated:   2013-08-31T07:12:09.000Z
---

<div>Hi, i’m Kostas. I am a developer. I develop stuff for the web. I am using Linux, for my main development machine since i can remember. (I am 25 now so about 10 years or so).</div>
<div>

But one day i was tired. I was bored of all this mess, that was just not my job. I didn’t care about package conflicts, or kernel recompilation. So i format and this time i went on Windows. I thought let’s make my developing life a little more easier. But that’s just didn’t work. Instead, about 5 months later, i am feeling anti-productive. Yes that’s right. Nothing is working the way i need to work.

So i present to you <a title="Vagrant" href="http://www.vagrantup.com/" target="_blank">Vagrant</a>.

Vagrant is a nice middleware between you and <a title="VirtualBox" href="https://www.virtualbox.org/" target="_blank">VirtualBox</a>. It provides all the tools you need to set up your development environment almost everywhere and almost immediately.

Consider this. You are working on an online service that is deployed on a hosting machine somewhere. You can’t develop your newly features on the production server and also you don’t want an FTP connection to work. You need everything local. You want also to have an exact same machine, as your remote machine, to work with. With the same exact libraries and the corresponding versions of these. After you have <a title="Download Vagrant" href="http://downloads.vagrantup.com/" target="_blank">download </a>Vagrant:

```bash
$  vagrant init precise32 &lt;a href=&quot;http://files.vagrantup.com/precise32.bo&quot;&gt;http://files.vagrantup.com/precise32.bo&lt;/a&gt;
```

```bash
$ vagrant up
```

```bash
 $ vagrant ssh
```

Just setup your Linux box with all the services, libraries and stuff you need. Edit the .VagrantFile, by first checking the <a title="Vagrant Docs" href="http://docs.vagrantup.com/v2/getting-started/index.html" target="_blank">docs</a>. You can make all the cool stuff like port forwarding and shared folders on your hosting machine.

Now you need to share this box with your colleagues so you can work on the same exact machine.Vagrant let’s you create packages. Those packages are just some configuration files you can even upload to <a title="Github" href="http://www.github.com/" target="_blank">Github </a>and let others grab them.

But the greatest feature, Vagrant has to <a title="Vagrant Provisioning" href="http://docs.vagrantup.com/v2/provisioning/index.html" target="_blank">offer </a>you is <a title="Server Provisioning" href="http://en.wikipedia.org/wiki/Provisioning" target="_blank">Server Provisioning</a>. Use<a title="Puppet" href="http://puppetlabs.com/puppet/puppet-enterprise" target="_blank">Puppet </a>or <a title="Chef Provisioning" href="http://docs.opscode.com/chef_overview.html" target="_blank">Chef </a>to define all the services and packages you want automatically to install on the box, so everyone got’s the same exact machine as your production server or even the staging/testing server.

There it is, never worry about your main desktop OS. Create a development environment once and for all.

</div>
