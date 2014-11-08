require 'pyro'
require 'sinatra'

FACEBOOK_ID = ''
FACEBOOK_TOKEN = ''

enable :sessions

get '/' do
  File.read(File.join('public', 'index.html'))
end

# pyro = TinderPyro::Client.new
# pyro.sign_in(FACEBOOK_ID, FACEBOOK_TOKEN)


# p pyro.get_nearby_users['results'].map { |e| e['name']  }
