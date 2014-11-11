require 'sinatra'
require 'mongoid'
require 'json'

configure do
  Mongoid.load!("./config/mongoid.yml")
end

class Weather
  include Mongoid::Document
  field :date, type: String
  field :temperature, type: String
end

get '/todays_weather.json' do
  if Weather.all.count == 0
    Weather.create(date: "2014.11.10", temperature: "+9")
    Weather.create(date: "2014.11.11", temperature: "+8")
    Weather.create(date: "2014.11.12", temperature: "+7")
    Weather.create(date: "2014.11.13", temperature: "+6")
    Weather.create(date: "2014.11.14", temperature: "+5")
    Weather.create(date: "2014.11.15", temperature: "+4")
    Weather.create(date: "2014.11.16", temperature: "+9")
  end
  headers['Content-Type'] = 'application/json; charset=utf-8'
  response['Access-Control-Allow-Origin'] = '*'
  collection = Weather.all.map{|w| { date: w[:date],temperature: w[:temperature] } }
  { collection: collection }.to_json
end
