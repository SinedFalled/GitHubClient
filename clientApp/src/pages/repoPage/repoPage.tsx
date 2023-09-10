
export type repoProps ={
    className: string,

}

const repoPage: React.FC<repoProps> = (props) =>{
    const {className } = props
    return (
        <div className={className}>

        </div>
    )
}

export default repoPage;