import '../css/style.css';
import '../css/history.css';

function History() {

    let historyNameList = ["Chat 1","Chat 2","Chat 3","Chat 4","Chat 5","Chat 6","Chat 7","Chat 8","Chat 9"];
    // let historyNameList = ["Chat 1","Chat 2","Chat 3"];
    return (
        <div className="chat-history-container">
            <div className="history-title">History</div>
            <div className="history-container-wrapper">
                <div className="history-container">
                    {
                        historyNameList.map((historyName, index) => (
                            <div className="history-item" key={index}>
                                {historyName}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default History;