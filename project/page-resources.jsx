const{Button,Card,Badge}=window.LMViC360DesignSystem_20f8b1;
function App(){
  const[lang,setLang]=useLang();
  const[cat,setCat]=React.useState('');
  const res=window.LVData.resources;
  const cats=[...new Set(res.map(r=>tr(lang,r.cat[0],r.cat[1])))];
  const list=res.filter(r=>!cat||tr(lang,r.cat[0],r.cat[1])===cat);
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="resources.html" app="seeker"/>
    <main>
      <PageHead lang={lang} crumb={tr(lang,'Cẩm nang nghề nghiệp','Career Resources')} title={tr(lang,'Hướng dẫn thực tế cho hành trình nghề nghiệp của bạn.','Practical guidance for your career.')} desc={tr(lang,'Những bài viết ngắn về hồ sơ, ứng tuyển, phỏng vấn và phát triển nghề nghiệp tại Việt Nam.','Short reads on profiles, applications, interviews and growing your career in Vietnam.')}/>
      <section className="lv-section" style={{paddingTop:56}}>
        <div className="lv-filter-row" style={{justifyContent:'flex-start'}}>
          <button className={`lv-filter-chip ${!cat?'active':''}`} onClick={()=>setCat('')}>{tr(lang,'Tất cả','All')}</button>
          {cats.map(c=><button key={c} className={`lv-filter-chip ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <div className="lv-res-grid">{list.map(r=><Reveal key={r.title[1]}><article className="lv-res-card">
          <span className="lv-res-cat">{tr(lang,r.cat[0],r.cat[1])}</span>
          <h3>{tr(lang,r.title[0],r.title[1])}</h3>
          <p>{tr(lang,r.desc[0],r.desc[1])}</p>
          <div className="lv-res-foot"><span>{tr(lang,r.read[0],r.read[1])}</span>
            <a href="#" className="lv-job-view" onClick={e=>e.preventDefault()}>{tr(lang,'Đọc bài ','Read ')}<Icon name="arrow-right" size={14}/></a></div>
        </article></Reveal>)}</div>
      </section>
      <section className="lv-section lv-section-blue">
        <Reveal className="lv-section-head"><h2>{tr(lang,'Cần trợ giúp khi dùng LàmViệc360?','Need help using LàmViệc360?')}</h2>
          <p>{tr(lang,'Trung tâm hỗ trợ giải đáp các câu hỏi về hồ sơ, đơn ứng tuyển và tài khoản doanh nghiệp.','The Help Center answers questions about profiles, applications and company accounts.')}</p></Reveal>
        <div className="lv-steps" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
          {[['user','Hồ sơ & tài khoản','Profiles & accounts'],['file-text','Ứng tuyển','Applications'],['building-2','Tài khoản doanh nghiệp','Company accounts']].map(x=>
            <Reveal key={x[2]}><Card style={{padding:'var(--space-6)',display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
              <div className="lv-trust-icon"><Icon name={x[0]} size={20}/></div>
              <h3 className="lv-feature-title">{tr(lang,x[1],x[2])}</h3>
              <a href="#" className="lv-job-view" onClick={e=>e.preventDefault()}>{tr(lang,'Xem bài viết ','Browse articles ')}<Icon name="arrow-right" size={14}/></a>
            </Card></Reveal>)}
        </div>
      </section>
      <Reveal as="section" className="lv-final-cta lv-final-cta-blue">
        <h2>{tr(lang,'Sẵn sàng ứng tuyển?','Ready to apply?')}</h2>
        <p>{tr(lang,'Đưa những gì bạn vừa đọc vào thực tế — khám phá việc làm phù hợp với kỹ năng của bạn.','Put what you have read into practice — explore jobs that match your skills.')}</p>
        <div className="lv-final-cta-buttons">
          <Button variant="primary" size="lg" style={{background:'var(--surface-card)',color:'var(--blue-700)'}} onClick={()=>location.href='jobs.html'}>{tr(lang,'Khám phá việc làm','Explore Jobs')}</Button>
          <Button variant="ghost" size="lg" style={{color:'var(--text-inverse)',border:'1.5px solid rgba(255,255,255,0.5)'}} onClick={()=>location.href='register.html'}>{tr(lang,'Tạo hồ sơ miễn phí','Create Free Profile')}</Button>
        </div>
      </Reveal>
    </main>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
