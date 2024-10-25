import "../styles/hero.css"
function Hero(props){
    return(
        <div className={props.cname}>
            <img alt="hello" src={props.heroimg}/>
            <div className="hero-text">
                <h1>{props.title}</h1>
                <p>{props.par}</p>
                <a href={props.url} className={props.btnclass}>{props.btntext}</a>
            </div>
        </div>
    )
}
export default Hero;