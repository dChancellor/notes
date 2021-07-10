export const api = {
    url: "http://localhost:5123/api/v1/notes"
}

export const settings = {
    noteTypes: [
        {name:'Quote', helper:'A direct quote from the book'},
        {name:'Thought', helper:'A random thought - this is a bit of a catch-all'},
        {name:'Connection', helper:'A connection to another work - book, movie, etc. Leave a reference'},
        {name:'Definition', helper:'A definition of a term, word or concept'},
        {name:'Concept', helper:'These are broad umbrella understandings of the lit, a more nebulous summary of a theory/proposal/explanation in my own words'},
    ],
    colorScheme: {
        samwise:{
            main:{
                background:'#212121',
                lightestText:'#',
                lightText:'#e9d8a4',
                darkText:'#E5CC83',
                textAreaDropShadow: '4px 4px 4px 0px #00000025',
                textAreaInsetShadow: 'inset 0px 0px 3px 4px #00000025'
            },
            sidebar:{
                background:'linear-gradient(#292929, #272727)',
                pinnedBook:'#157A6E',
                activeBook:'#693391',
                defaultBook:'', 
                authorText: '#7d7d7d',
                searchBox: '#414141',
                scrollThumb: '#00ffff', 
                scrollBackground: '#212121', 
                unlocked:'#e2d2d6',
                locked: '#272727',
                activeGradient: 'linear-gradient(#e068fe, #a552e2)',
                pinnedGradient: 'linear-gradient(#9cb07b, #59983b)',
                bookwise: 'linear-gradient(to right, #53E38D, #DC66FC)',
            },
            notes:{
                quote:'linear-gradient(#FEEF68, #E2A052)',
                quoteBackground:'#878259',
                thought: 'linear-gradient(#9cb07b, #59983b)',
                thoughtBackground:'#6a7a4e',
                connection:'linear-gradient(#e068fe, #a552e2)',
                connectionBackground:'#785680',
                definition:'linear-gradient(#5ec2d9, #356785)',
                definitionBackground:'#586d72',
                concept:'linear-gradient(#ea72aa, #a22c52)',
                conceptBackground:'#916379',
            }
        },
    }
}