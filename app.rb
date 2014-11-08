require 'pyro'
require 'sinatra'

set :sessions, true
set :session_secret, 'some-very-large-random-value'

pyro = TinderPyro::Client.new

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/sign_in' do 
 	pyro.sign_in( params[:FACEBOOK_ID], params[:FACEBOOK_TOKEN] )
 	session[:auth] = pyro.instance_variable_get(:@requestor).instance_variable_get(:@auth_token)
 	"#{pyro.instance_variable_get(:@requestor).instance_variable_get(:@auth_token)}"
end

get '/get_nearby_users' do
	pyro.instance_variable_get(:@requestor).instance_variable_set(:@auth_token, session[:auth])
	x = pyro.get_nearby_users
	"#{x}"
end