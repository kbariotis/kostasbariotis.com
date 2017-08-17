---
title: "Deploying Node.js Applications on DigitalOcean using Ansible"
path: "/deploying-nodejs-applications-digitalocean-ansible/"
date: "2016-12-15T09:35:03.000Z"
date_updated:   2017-01-03T10:56:53.000Z
---

I was in the need to be able to automatically create a machine on [DigitalOcean](https://digitalocean.com) for my personal projects, provision it and then upload an app and run it. Then I wanted to be able to deploy it again later on or make changes to the infrastructure in a more controlled way.

I wanted to automate the whole process so I can save some time and spend it on actually writing code.

## The problem

Up until recently, bootstrapping of my personal projects looked like this:

* I would create a DigitalOcean droplet
* I would ssh into it after I have added my SSH key
* I would put a simple configuration, install dependencies, node.js runtime, etc
* Clone my project from Git
* Install nginx and set it as a reverse proxy for the node.js application
* Run it
* Leave it there

Whenever I wanted to release a new version, I would log into the droplet pull the repo and restart the node app. The same procedure would be for every other stack I have been playing around.

## My options
So I did my homework upfront and came up with these:

### Docker
Using [Docker](https://www.docker.com/), I was able to describe my stack inside a [single file](https://docs.docker.com/compose/), put it on the server and run it. The server would still have to be there somehow. I would still have to provision the server or have one server that would host many Docker containers. Also, Docker needs to rebuild on every change of the application.

I thought it was far away from what I was looking for.

### Terraform
[Terraform](https://www.terraform.io/) allows you to describe your stack and use it across all major platforms. It supports AWS, DigitalOcean, etc. The thing I didn't like was that it doesn't support provisioning of the server. You have to put a [puppet](https://puppet.com/) or [chef](https://www.chef.io/chef/) to actually provision the servers, if some, in your infrastructure.

I believe that Terraform would be much more suitable in an AWS infrastructure where you don't always need to provision something. Not all your infrastructure is going to be ElasticBeanstalk machines. But it is a great choice just to create and configure the dependent services like Lambda, SNS, SQS, API Gateway.

Not for my needs.

### Ansible
[Ansible](https://www.ansible.com/) is an automation tool for running commands on a remote server. Ansible can do anything that you would do from the command line. It even comes with modules so you can create a DigitalOcean droplet in a [single command](http://docs.ansible.com/ansible/digital_ocean_module.html).

You can actually describe the above procedure in a single file and run it as many times as you like. Ansible will make sure that every time only the needed changes would run. You can run it once and build the application without even an existing DigitalOcean droplet. Alternatively, you can run it with an existing droplet and it will just pull your application and rerun it.

I’m not going to get into detail about how ansible works, my friend [Stavros](https://www.stavros.io/posts/example-provisioning-and-deployment-ansible/) has written a nice post where he explains much more about it. Before that, start [from the documentation](http://docs.ansible.com/ansible/intro_getting_started.html). It's there after all, isn't it?

So, write an Ansible file (playbook in Ansible glossary) with the commands that you would run on the remote server. Use this file every time! That's it.

## Solution
I decided to go with Ansible. Ansible documentation isn't that extensive but with a little digging around you can actually find any missing information. It's [open source](https://github.com/ansible/ansible) so you can read the code and see how a module works for yourself. [Try it](https://github.com/ansible/ansible/blob/devel/lib/ansible/modules/cloud/digital_ocean/digital_ocean.py), it's not that hard! Also, Github is full of Ansible repositories. A lot of which you can grab from [Ansible Galaxy, Ansible's registry for playbooks](https://galaxy.ansible.com/). It comes with a package manager as well.

So I started hacking around and I ended up with an [Ansible playbook](https://github.com/kbariotis/ansible-nodejs-digitalocean) that will do all the above. It's configurable so I can just copy paste it on my new project and run it to create the droplet and provision it.

It also supports adding a domain that is pointing to the created droplet. Plus it will generate a [Let's Encrypt](https://letsencrypt.org) certificate for the specified domain.

So you will:

* Get a domain name and point it to DigitalOcean's nameservers. Remember to wait for the propagation to happen.
* Run this playbook once and... Boom! You're ready to go!

The playbook requires a bit knowledge of Ansible to hack the [tasks/project.yml](https://github.com/kbariotis/ansible-nodejs-digitalocean/blob/master/tasks/project.yml) and set it to your specific needs. Yeah, I had the exact same reaction! Don't be alarmed! It's easier that you think!

## Getting started
I will include a quick getting started kind of block here. There's detailed documentation over on [project's README](https://github.com/kbariotis/ansible-nodejs-digitalocean/blob/master/README.md) file.

1) Start by [installing Ansible](http://docs.ansible.com/ansible/intro_installation.html) on your local machine.

2) Clone the repo. Adjust your settings at [defaults/vars.yml](https://github.com/kbariotis/ansible-nodejs-digitalocean/blob/master/defaults/vars.yml). Required variables are the `system_user` which is the owner of the project on the remote server, `domain`, `do_token` ([get yours](https://cloud.digitalocean.com/settings/api/tokens)) and `repository` which is your repository.

3) Then run under the project's root directory:
`ansible-playbook main.yml --tags=launch`

The `launch` tag will create the droplet, configure it and set it to run the application specified on `repository` variable.

4) Now we have to instruct it on how to run your project. So start hacking the [tasks/project.yml](https://github.com/kbariotis/ansible-nodejs-digitalocean/blob/master/tasks/project.yml) which also includes an example of a simple Node.js project.

The example project will:

* gitpull your repo using the [gitpull module](http://docs.ansible.com/ansible/git_module.html)
* install project's dependencies using the [npm module](http://docs.ansible.com/ansible/npm_module.html) as well as global dependencies like `wepback` and `pm2`
* build your repo using `webpack`
* start it using `pm2`

That's it.

Thanks for reading this! Write your comments down below or [open an issue](https://github.com/kbariotis/ansible-nodejs-digitalocean/issues) if you find a bug!

*I am deploying this blog using the above playbook. It's a [Ghost](https://ghost.org/) blog and you can find the theme's source code [here](https://github.com/kbariotis/kostasbariotis.com).*
