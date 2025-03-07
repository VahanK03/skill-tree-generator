import ChatInterface from "../chat-logic/chat"

const SkillTree = () => {
    return (
        <div style={{display: "flex", flexDirection: "row", columnGap: "100px", marginTop: "100px"}} >
            <span style={{height: "450px", width: "1px", backgroundColor: "black", position: "absolute", top: "5%", left: "45%"}}></span>
            <div style={{ width: "40%", marginLeft: "50px"}}>
                <h1 style={{lineHeight: "1.5"}}>If you are <span style={{backgroundColor: "yellow"}}>career changer</span> fill the form, and get your <span style={{backgroundColor: "yellow"}}>OWN</span> road map!!!</h1>
                <h2 style={{marginTop: "200px"}}>After clicking to "Generate" please wait for magic...</h2>
            </div>
            <ChatInterface />
        </div>
    )
}
export default SkillTree