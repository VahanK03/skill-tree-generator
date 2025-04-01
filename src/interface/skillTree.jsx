import ChatInterface from "../chat-logic/chat"
import tree from "../utils/skill-tree.png"
import arrow from "../utils/arrow.png"

const SkillTree = () => {
    return (
        <div style={{display: "flex", flexDirection: "row", columnGap: "100px", marginTop: "100px", backgroundColor: "#eefa70", width: "90%", borderRadius: "30px", justifySelf: "center"}} >
            <div style={{ width: "40%", marginLeft: "50px"}}>
                <h1 style={{fontSize: "50px"}}>Your Personalized Path</h1>
                <h1 style={{fontSize: "50px", fontWeight: "400"}}>to a Digital Career</h1>
                <h3 style={{color: "gray"}}>asdasfsfdg kafjfka  jgks;gjs kjs;kh dkjh;kghj dkjd hjdhk;ldhj kljhs;k jskjhfklhjd;kjhd khd</h3>
                <img src={tree} alt="Skill Tree" style={{ width: "400px", height: "100px", marginTop: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", position: "absolute", top: "50%", left: "20%", zIndex: "1" }} />
                <img src={tree} alt="Skill Tree" style={{ width: "300px", height: "200px", marginTop: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", position: "absolute", top: "55%", left: "10%" }} />
                <img src={arrow} alt="arrow" style={{width: "300px", position: "absolute", top: "70%", left: "30%"}}/>
            </div>
            <ChatInterface />
        </div>
    )
}
export default SkillTree