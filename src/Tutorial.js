import Dialogue from "./Dialogue";
function Tutorial(props) {
    return <Dialogue onFinish={props.onClick} lines={[
        {
            text: '\'Twas the night before October 7th, and in Lab 8 not a creature was stirring. Or was it?',
            img: 'assets/room_start.png',
        },
        {
            text: 'What could that be? It seems to have crept out of its container...',
            img: 'assets/goober.png',
        },
        {
            text: 'Some tiny and helpless creature, no doubt. The poor thing, trapped in this lab, with only a small box and a few others of its kind of enrichment. You can tell that they yearn for the ourdoors...',
            img: 'assets/goober.png',
        },
        {
            text: 'In this game you\'ll lead the goobers to freedom from their laboratory. You\'ll control the population of goobers, sending them on expeditions in this unknown environment to gather food and explore new locations. But be careful! Danger lurks around every corner.'
        },

    ]} />
}

export default Tutorial;
