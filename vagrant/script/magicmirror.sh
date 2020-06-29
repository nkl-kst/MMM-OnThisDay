# Magic Mirror
# Module: MMM-OnThisDay
#
# By Nikolai Keist (github.com/nkl-kst)
# MIT Licensed.

# Clone MagicMirror
cd ~ || exit
git clone https://github.com/MichMich/MagicMirror

# Install MagicMirror libs
cd MagicMirror || exit
yarn install --production

# Link config
ln -s /MMM-OnThisDay/vagrant/config/config.js config/

# Link module
ln -s /MMM-OnThisDay modules/MMM-OnThisDay

# Install modules libs
cd /MMM-OnThisDay || exit
yarn install --no-lockfile

# Run in server mode
npm run server &
