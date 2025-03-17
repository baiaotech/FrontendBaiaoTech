export default function NoFoundEvent() {
    return (
        <main className="main">
            <div className="main-content">
                <div className="categories">
                    <div className="category-content">
                        <div className="category-title-btn">
                            <div className="category-title">
                                <h2>Categorias</h2>
                            </div>
                        </div>
                        <div className="card-categories">
                            <div className="card">
                                <div className="card-image"></div>
                                <div className="card-title">
                                    <h3>Evento não encontrado</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lastEvents">
                    <div className="lastEventsContent">
                        <div className="lastEventsTitle-btn">
                            <div className="lastEventsTitle">
                                <h2>Próximos Eventos</h2>
                            </div>
                        </div>

                        <div className="card-lastEvents">
                            <div className="card">
                                <div className="card-image"></div>

                                <div className="card-body">
                                    <div className="card-title">
                                        <h3>Evento não encontrado</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="eventAwaited">
                    <div className="eventAwaitedContent">
                        <div className="eventAwaitedTitle">
                            <h2>Evento mais aguardado</h2>
                        </div>

                        <div className="card-eventAwaited">
                            <div className="card-image"></div>

                            <div className="card-info">
                                <div className="info">
                                    <div className="card-title">
                                        <h3>Evento não encontrado</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}