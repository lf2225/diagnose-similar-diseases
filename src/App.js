import React, { Component } from 'react'
import { extend } from 'lodash'
import { SearchkitManager,SearchkitProvider,
  SearchBox, Pagination, HitsStats, SortingSelector, NoHits,
  ResetFilters,
  ViewSwitcherHits, ViewSwitcherToggle, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow } from 'searchkit'
import './index.css'

const host = "http://localhost:9200/gnosis"
const searchkit = new SearchkitManager(host)


const HitsList = (props)=> {
  const {bemBlocks, result} = props
  const source:any = extend({}, result._source, result.highlight)
  let url = 'http://disease-ontology.org/search?q='+source.title.replace(/,/g, '').replace(/'/g, '')
  return (
    <div>
      <div className={bemBlocks.item("results")}>
        <h2 className={bemBlocks.item("keyword")}dangerouslySetInnerHTML={{__html:source.title.replace(/,/g, '').replace(/'/g, '')}}></h2>
          <a href={url}><h4 className={bemBlocks.item("lookup")}>Lookup Disease on Disease Ontology</h4></a>
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo"><font color="white"><b>Keyword Diagnosis</b></font></div>
            <SearchBox autofocus={true} searchOnChange={false}/>
          </TopBar>

        <LayoutBody>

          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found!"
                }}/>
                <ViewSwitcherToggle/>
                <SortingSelector options={[
                  {label:"Relevance", field:"_score", order:"desc"},
                ]}/>
              </ActionBarRow>

              <ActionBarRow>
                <GroupedSelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <ViewSwitcherHits
                hitsPerPage={24} highlightFields={["title"]}
                sourceFilter={["title"]}
                hitComponents={[
                  {key:"list", title:"List", itemComponent:HitsList}                ]}
                scrollTo="body"
            />
            <NoHits suggestionsField={"title"}/>
            <Pagination showNumbers={true}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>

      </SearchkitProvider>
    );
  }
}


export default App;
