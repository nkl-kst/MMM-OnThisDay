# Magic Mirror
# Module: MMM-OnThisDay
#
# By Nikolai Keist (github.com/nkl-kst)
# MIT Licensed.

Vagrant.configure("2") do |config|

  # Box
  config.vm.box = 'generic/debian10'

  # Ports
  config.vm.network 'forwarded_port', guest: 80, host: 80

  # Shared folders
  config.vm.synced_folder '.', '/MMM-OnThisDay'

  # Scripts
  config.vm.provision 'shell', path: 'vagrant/script/packages.sh'
  config.vm.provision 'shell', path: 'vagrant/script/magicmirror.sh'

end
