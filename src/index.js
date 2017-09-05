import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function get_q() {
  document.getElementsByTagName('form')[0].addEventListener("submit",(function(){
  var q = document.getElementsByTagName('form')[0].childNodes[1].value
  var result = document.getElementsByClassName('sk-hits-list-hit__details')[1]
  if (result === undefined & typeof(q) === 'string' & q.length > 2) {
    window.location.assign('http://disease-ontology.org/search?q='+q)
  }

  })
)}

function callback() {
  ReactDOM.render(
  <App />,
  document.getElementById('root')
);
get_q()
}

callback()
