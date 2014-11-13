require 'pyro'
require 'sinatra'
require 'rest_client'
require 'json'

def request_tinder(path, token)
  user_agent = 'Tinder/4.0.9 (iPhone; iOS 8.0.2; Scale/2.00)'
  url = 'https://api.gotinder.com/' + path
  return RestClient.post(url, {},
                         :user_agent => user_agent,
                         :'X-Auth-Token' => token)
end

matches = JSON(open('/tmp/matches.json').read)['matches']
recommendations = JSON(open('/tmp/recommendations.json').read)['results']

db = {
  recommendations: recommendations.map { |recommendation|
    {
      id: recommendation['_id'],
      name: recommendation['name'],
      gender: recommendation['gender'],
      biography: recommendation['bio'],
      photos: recommendation['photos'].map { |photo| photo['id'] }
    }
  },
  matches: matches.map { |match|
    {
      id: match['id'],
      peer: match['participants'][0],
      messages: match['messages'].map { |message| message['_id'] }
    }
  },
  users: matches.map { |match|
    {
      id: match['person']['_id'],
      name: match['person']['name'],
      gender: match['person']['gender'],
      biography: match['person']['bio'],
      photos: match['person']['photos'].map { |photo| photo['id'] }
    }
  },
  photos: [
    matches.map { |match|
      match['person']['photos'].map { |photo|
        {
          id: photo['id'],
          extension: photo['extension'],
          user: match['person']['_id']
        }
      }
    },
    recommendations.map { |recommendation|
      recommendation['photos'].map { |photo|
        {
          id: photo['id'],
          extension: photo['extension'],
          user: recommendation['_id']
        }
      }
    }
  ].flatten,

  messages: matches.map { |match|
    match['messages'].map { |message|
      {
        id: message['_id'],
        match: message['match_id'],
        from: message['from'],
        to: message['to'],
        content: message['message']
      }
    }
  }.flatten
}

set :sessions, true
set :session_secret, 'some-very-large-random-value'

pyro = TinderPyro::Client.new

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

get '/api/matches' do
  { matches: db[:matches] }.to_json
end

get '/api/users' do
  if params[:recommendations]
    { users: db[:recommendations] }.to_json
  else
    { users: db[:users] }.to_json
  end
end

get '/api/users/:id' do |id|
  puts JSON.pretty_generate(request.env)
  user = db[:users].find { |user|
    user[:id] == id
  }
  { user: user }.to_json
end

get '/api/messages' do
  { messages: db[:messages] }.to_json
end

get '/api/messages/:id' do |id|
  message = db[:messages].find { |message|
    message[:id] == id
  }
  { message: message }.to_json
end

get '/api/photos' do
  { photos: db[:photos] }.to_json
end

get '/api/photos/:id' do |id|
  photo = db[:photos].find { |photo|
    photo[:id] == id
  }
  { photo: photo }.to_json
end

get '/*' do
  File.read(File.join('public', 'index.html'))
end
