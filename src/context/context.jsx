import { createContext, useState } from "react";
import run from "../Config/gemini";

export const Context = createContext();

const ContextProvider =(props)=>{

    const [input ,setInput] =useState("");
    const [recentPrompt ,setRecentPrompt] =useState("");
    const [prevPrompts ,setPrevPrompts] =useState([]);
    const [showResult ,setShowResult] =useState(false);
    const [loading ,setLoading] =useState(false);
    const [resultData , setResultData] = useState("");

    const delayPara = (index , nextWord) =>{
        setTimeout(function () {
            setResultData(prev=>prev+nextWord)
        },75*index)

    }

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)

    }
    const onSent = async (prompt) =>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else
        {
           setPrevPrompts(prev=>[...prev,input])
           setRecentPrompt(input)
           response = await run(input)
        }

        let responseArry= response.split("**");
        let newResponse =" ";
        for (let i=0; i<responseArry.length ;i++)
        {
            if(i===0 || i%2 !==1){
                newResponse +=responseArry[i];
            }
            else{
                newResponse += "<b>"+responseArry[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArry = newResponse2.split(" ");
        for (let i=0 ;i<newResponseArry.length;i++)
        {
            const nextWord = newResponseArry[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")

    }
    
   

    const contextValue={
           prevPrompts,
           setPrevPrompts,
           onSent,
           setRecentPrompt,
           recentPrompt,
           showResult,
           loading,
           resultData,
           input,
           setInput,
           newChat



    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;