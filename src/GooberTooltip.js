function GooberTooltip(props) {
    const { goober, showDescription } = props
    return (
        <div className="tooltip goober-tooltip">
            <div>{goober.klass}</div>
            {showDescription && <div>{goober.description}</div>}
        </div>
    );
}

export default GooberTooltip;