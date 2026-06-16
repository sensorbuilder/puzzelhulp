import React from "react";
import Results from "./ResultsAPI3"
import Footer from './Footer'

export default function Main() {    
    const [post, setPost] = React.useState("");
    const [searchWord, setSearchWord] = React.useState("")
    const [searchSolution, setSearchSolution] = React.useState([{ letters: 8, woorden: ['No Result']}])
    const [solutionSource, setSolutionSource] = React.useState("")

    function handleSubmit(event) {
        event.preventDefault()
        setSearchWord(post.trim().toUpperCase())
    }
    
    function handleChange(event) {
        setPost(event.target.value)
    }

    function handleFocus(event) {
        event.target.select()
    }

    console.log(`Rendered - Main - Data source: ${solutionSource || 'not set'}`)
    return (
        <main>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="searchword"
                    placeholder='zoekwoord invoeren'
                    className="form--input"
                    value={post}
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
                <button 
                    type="submit"
                    className="form--button"
                    name="Zoek"
                >
                    Zoek
                </button>
            </form>
            <Results searchword={searchWord} solution={searchSolution} setSolution={setSearchSolution} setSolutionSource={setSolutionSource} />
            <Footer solution={searchSolution} />
        </main>
    )
}