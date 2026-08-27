const{Button,Badge,Select}=window.LMViC360DesignSystem_20f8b1;
function App(){
  const[lang,setLang]=useLang();
  const[q,setQ]=React.useState('');
  const[ind,setInd]=React.useState('');
  const[verifiedOnly,setVerifiedOnly]=React.useState(false);
  const inds=[...new Set(window.LVData.companies.map(c=>c.industry))];
  const list=window.LVData.companies.filter(c=>
    (!q||c.name.toLowerCase().includes(q.toLowerCase()))&&(!ind||c.industry===ind)&&(!verifiedOnly||c.verified));
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="companies.html" app="seeker"/>
    <main>
      <PageHead lang={lang} crumb={tr(lang,'Công ty','Companies')} title={tr(lang,'Khám phá những doanh nghiệp bạn có thể tin tưởng.','Discover companies you can trust.')} desc={tr(lang,'Tìm hiểu cơ hội từ các doanh nghiệp được LàmViệc360 xem xét và phê duyệt.','Explore opportunities from companies reviewed and approved by LàmViệc360.')}>
        <form className="lv-search-bar" onSubmit={e=>e.preventDefault()}>
          <div className="lv-search-field"><Icon name="search" size={18}/>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder={tr(lang,'Tìm theo tên công ty','Search by company name')} aria-label={tr(lang,'Tìm theo tên công ty','Search by company name')}/></div>
        </form>
        <div style={{maxWidth:320,marginTop:'var(--space-4)'}}>
          <Field><Select label={tr(lang,'Ngành nghề','Industry')} placeholder={tr(lang,'Tất cả ngành nghề','All industries')} value={ind} onChange={e=>setInd(e.target.value)} options={inds.map(i=>({value:i,label:i}))}/></Field>
        </div>
        <div style={{marginTop:'var(--space-4)'}}>
          <Check label={tr(lang,'Chỉ hiển thị doanh nghiệp đã xác thực','Show verified companies only')} checked={verifiedOnly} onChange={()=>setVerifiedOnly(v=>!v)}/>
        </div>
      </PageHead>
      <section className="lv-section" style={{paddingTop:56}}>
        <div className="lv-results-bar"><div className="lv-results-count"><strong>{list.length}</strong> {tr(lang,'doanh nghiệp','companies')}</div></div>
        {list.length?<div className="lv-company-grid">{list.map(c=><Reveal key={c.id}><CompanyCard c={c} lang={lang}/></Reveal>)}</div>
          :<div className="lv-empty"><h3>{tr(lang,'Không tìm thấy doanh nghiệp','No companies found')}</h3><p>{tr(lang,'Hãy thử một từ khóa khác.','Try a different search term.')}</p></div>}
      </section>
      <Reveal as="section" className="lv-final-cta lv-final-cta-navy">
        <h2>{tr(lang,'Doanh nghiệp của bạn đang tuyển dụng?','Is your company hiring?')}</h2>
        <p>{tr(lang,'Đăng ký, được xác thực và bắt đầu đăng tin tuyển dụng trên LàmViệc360.','Register, get verified and start posting jobs on LàmViệc360.')}</p>
        <div className="lv-final-cta-buttons">
          <Button variant="primary" size="lg" onClick={()=>location.href='company-register.html'}>{tr(lang,'Đăng ký doanh nghiệp','Register Your Company')}</Button>
          <Button variant="ghost" size="lg" style={{color:'var(--text-inverse)',border:'1.5px solid rgba(255,255,255,0.5)'}} onClick={()=>location.href='employers.html'}>{tr(lang,'Dành cho Nhà tuyển dụng','For Employers')}</Button>
        </div>
      </Reveal>
    </main>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
