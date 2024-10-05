
function GooberGroup(props) {
    return (
        <div>
            {props.goobers.map(x => (
                <div key={x.name}>
                    {x.name} ({x.klass})
                </div>
            ))}
        </div>
    );
}

export default GooberGroup;
