const{Button,Card,Badge,Avatar}=window.LMViC360DesignSystem_20f8b1;
function HeroVisual({lang}){
  const steps=[['search','Tìm kiếm','Search'],['sparkles','Gợi ý phù hợp','Match'],['file-text','Ứng tuyển','Apply'],['users','Phỏng vấn','Interview'],['check-circle','Được tuyển','Hired']];
  return <div className="lv-hero-visual">
    <div className="lv-hero-visual-track">
      {steps.map((s,i)=><React.Fragment key={s[1]}>
        <div className="lv-hero-step"><div className="lv-hero-step-icon"><Icon name={s[0]} size={20}/></div><span>{tr(lang,s[1],s[2])}</span></div>
        {i<steps.length-1&&<div className="lv-hero-step-line"></div>}
      </React.Fragment>)}
    </div>
    <div className="lv-hero-card lv-hero-card-1">
      <div className="lv-hero-card-row"><Avatar name="ABC" size={36}/><div><div className="lv-hero-card-title">{tr(lang,'Kỹ sư Backend','Backend Engineer')}</div><div className="lv-hero-card-sub">ABC Technologies</div></div></div>
      <Badge tone="success">{tr(lang,'Phù hợp 92%','92% match')}</Badge>
    </div>
    <div className="lv-hero-card lv-hero-card-2"><Icon name="sparkles" size={16} style={{color:'var(--blue-600)'}}/><span>{tr(lang,'6 việc làm được gợi ý cho hồ sơ của bạn','6 jobs recommended for your profile')}</span></div>
    <div className="lv-hero-card lv-hero-card-3"><Icon name="trending-up" size={16} style={{color:'var(--green-600)'}}/><span>{tr(lang,'Hồ sơ hoàn thiện 80%','Profile 80% complete')}</span></div>
  </div>;
}
function Hero({lang}){
  const[q,setQ]=React.useState('');
  const[loc,setLoc]=React.useState('');
  const go=(extra)=>{const p=new URLSearchParams();if(q)p.set('q',q);if(loc)p.set('loc',loc);if(extra)p.set('type',extra);location.href='jobs.html'+(p.toString()?'?'+p:'');};
  return <section className="lv-hero"><div className="lv-hero-inner">
    <Reveal className="lv-hero-copy">
      <span className="lv-eyebrow">{tr(lang,'DÀNH CHO NGƯỜI TÌM VIỆC','FOR JOB SEEKERS')}</span>
      <h1 className="lv-hero-h1">{tr(lang,'Tìm đúng việc.','Find the Right Job.')}<br/>{tr(lang,'Xây dựng tương lai.','Build Your Future.')}</h1>
      <p className="lv-hero-sub">{tr(lang,'Khám phá cơ hội phù hợp, tạo hồ sơ chuyên nghiệp, ứng tuyển nhanh hơn và theo dõi mọi đơn ứng tuyển ở một nơi duy nhất.','Discover relevant opportunities, create a professional profile, apply faster and track every application in one place.')}</p>
      <form className="lv-search" onSubmit={(e)=>{e.preventDefault();go();}}>
        <div className="lv-search-field"><Icon name="search" size={18}/>
          <input type="text" placeholder={tr(lang,'Vị trí, kỹ năng hoặc công ty','Job title, skill or company')} aria-label={tr(lang,'Vị trí, kỹ năng hoặc công ty','Job title, skill or company')} value={q} onChange={e=>setQ(e.target.value)}/></div>
        <div className="lv-search-field lv-search-field-loc"><Icon name="map-pin" size={18}/>
          <input type="text" placeholder={tr(lang,'Địa điểm','Location')} aria-label={tr(lang,'Địa điểm','Location')} value={loc} onChange={e=>setLoc(e.target.value)}/></div>
        <Button variant="primary" size="lg" style={{whiteSpace:'nowrap'}}>{tr(lang,'Tìm việc','Find Jobs')}</Button>
      </form>
      <div className="lv-quick-filters">
        {['Full-time','Remote','Part-time','Contract','Internship'].map(f=><button key={f} className="lv-quick-filter" onClick={()=>go(f)}>{tr(lang,window.FILTER_VI[f],f)}</button>)}
      </div>
      <div className="lv-hero-ctas">
        <Button variant="primary" size="lg" onClick={()=>location.href='jobs.html'}>{tr(lang,'Tìm việc làm','Find Jobs')}</Button>
        <Button variant="secondary" size="lg" onClick={()=>location.href='register.html'}>{tr(lang,'Tạo hồ sơ của bạn','Create Your Profile')}</Button>
      </div>
    </Reveal>
    <Reveal className="lv-hero-visual-wrap"><HeroVisual lang={lang}/></Reveal>
  </div></section>;
}
function WhyUs({lang}){
  const items=lang==='VI'?[['sparkles','Gợi ý việc làm thông minh','Nhận đề xuất dựa trên kỹ năng, kinh nghiệm và mục tiêu nghề nghiệp của bạn.'],['zap','Ứng tuyển một lần nhấn','Dùng hồ sơ đã lưu để gửi đơn ứng tuyển mà không phải nhập lại thông tin.'],['user-check','So khớp theo hồ sơ','Hồ sơ của bạn được so khớp với yêu cầu thực tế của từng vị trí.'],['list-checks','Theo dõi ứng tuyển','Xem trạng thái từng đơn từ Đã nộp đến Được tuyển.'],['trending-up','Thông tin nghề nghiệp','Tìm hiểu về mức lương, kỹ năng và ngành nghề đang tuyển dụng.']]
    :[['sparkles','Smart job recommendations','Get suggestions based on your skills, experience and career goals.'],['zap','One-click applications','Use your saved profile to apply without re-entering your details.'],['user-check','Profile-based matching','Your profile is matched against the real requirements of each role.'],['list-checks','Application tracking','See where every application stands, from Applied to Hired.'],['trending-up','Career insights','Understand salary ranges, in-demand skills and hiring industries.']];
  return <section className="lv-section lv-section-blue" id="why">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'VÌ SAO CHỌN CHÚNG TÔI','WHY JOB SEEKERS CHOOSE US')}</span>
      <h2>{tr(lang,'Mọi thứ bạn cần cho hành trình nghề nghiệp.','Everything you need for your career journey.')}</h2>
    </Reveal>
    <div className="lv-sol-grid">{items.map(x=><Reveal key={x[1]}><div className="lv-sol-card">
      <div className="lv-sol-icon"><Icon name={x[0]} size={22}/></div>
      <h3>{x[1]}</h3><p>{x[2]}</p>
    </div></Reveal>)}</div>
  </section>;
}
function HowItWorks({lang}){
  const steps=lang==='VI'?[['01','Tạo hồ sơ','Thêm kinh nghiệm, kỹ năng và mục tiêu nghề nghiệp của bạn.'],['02','Khám phá việc phù hợp','Tìm và lọc theo những điều quan trọng với bạn.'],['03','Ứng tuyển','Gửi đơn ứng tuyển chỉ trong vài bước với hồ sơ đã lưu.'],['04','Theo dõi ứng tuyển','Xem trạng thái và phản hồi ở từng giai đoạn.'],['05','Được tuyển dụng','Nhận đề nghị và bắt đầu công việc mới.']]
    :[['01','Create your profile','Add your experience, skills and career goals.'],['02','Discover relevant jobs','Search and filter by what matters to you.'],['03','Apply','Submit an application in a few steps using your saved profile.'],['04','Track applications','See status and feedback at every stage.'],['05','Get hired','Receive your offer and start your new role.']];
  return <section className="lv-section" id="how">
    <Reveal className="lv-section-head"><h2>{tr(lang,'Cách hoạt động','How it works')}</h2></Reveal>
    <div className="lv-steps" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
      {steps.map(s=><Reveal key={s[0]}><div className="lv-step"><span className="lv-step-num">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div></Reveal>)}
    </div>
  </section>;
}
function FeaturedJobs({lang}){
  const[filter,setFilter]=React.useState(null);
  const[saved,setSaved]=React.useState({});
  const jobs=window.LVData.jobs.filter(j=>!filter||j.type===filter).slice(0,6);
  return <section className="lv-section lv-section-blue" id="jobs">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'CƠ HỘI ĐANG CHỜ ĐÓN','OPPORTUNITIES AWAIT')}</span>
      <h2>{tr(lang,'Việc làm nổi bật','Featured jobs')}</h2>
      <p>{tr(lang,'Khám phá những cơ hội mới nhất từ các doanh nghiệp đang tìm kiếm nhân tài.','Explore the latest opportunities from companies looking for talented people.')}</p>
    </Reveal>
    <Reveal className="lv-filter-row">
      <button className={`lv-filter-chip ${!filter?'active':''}`} onClick={()=>setFilter(null)}>{tr(lang,'Tất cả','All')}</button>
      {['Full-time','Remote','Part-time','Contract','Internship'].map(f=><button key={f} className={`lv-filter-chip ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{tr(lang,window.FILTER_VI[f],f)}</button>)}
    </Reveal>
    <div className="lv-job-grid">{jobs.map(j=><Reveal key={j.id}><Card hoverable style={{padding:'var(--space-5)'}}>
      <div className="lv-job-top">
        <div className="lv-job-logo" aria-hidden="true">{j.company.slice(0,2).toUpperCase()}</div>
        <button className="lv-job-save" aria-label={saved[j.id]?tr(lang,'Bỏ lưu việc','Unsave job'):tr(lang,'Lưu việc','Save job')} aria-pressed={!!saved[j.id]} onClick={()=>setSaved(s=>({...s,[j.id]:!s[j.id]}))}>
          <Icon name="heart" size={18} style={{fill:saved[j.id]?'var(--red-500)':'none',color:saved[j.id]?'var(--red-500)':'var(--gray-400)'}}/></button>
      </div>
      <h3 className="lv-job-title"><a href={`job-detail.html?id=${j.id}`} style={{color:'inherit'}}>{tr(lang,j.titleVi,j.title)}</a></h3>
      <div className="lv-job-company">{j.company}{j.verified&&<Badge tone="brand"><Icon name="check" size={11}/> {tr(lang,'Đã xác thực','Verified')}</Badge>}</div>
      <div className="lv-job-meta">
        <span><Icon name="map-pin" size={14}/>{tr(lang,j.locationVi,j.location)}</span>
        <span><Icon name="wallet" size={14}/>{j.salary}</span>
        <span><Icon name="briefcase" size={14}/>{tr(lang,j.levelVi,j.level)}</span>
      </div>
      <div className="lv-job-tags"><Badge tone="neutral">{tr(lang,window.FILTER_VI[j.type]||j.type,j.type)}</Badge><Badge tone="neutral">{tr(lang,j.modeVi,j.mode)}</Badge></div>
      <div className="lv-job-footer"><span className="lv-job-posted">{tr(lang,j.postedVi,j.posted)}</span>
        <Button variant="primary" size="sm" onClick={()=>location.href=`job-detail.html?id=${j.id}`}>{tr(lang,'Ứng tuyển','Apply')}</Button></div>
    </Card></Reveal>)}</div>
    <Reveal style={{textAlign:'center',marginTop:'var(--space-10)'}}><a href="jobs.html" className="lv-view-all">{tr(lang,'Xem tất cả việc làm ','View all jobs ')}<Icon name="arrow-right" size={16}/></a></Reveal>
  </section>;
}
function TopCompanies({lang}){
  return <section className="lv-section" id="companies">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'NHÀ TUYỂN DỤNG ĐÁNG TIN CẬY','TRUSTED EMPLOYERS')}</span>
      <h2>{tr(lang,'Các công ty hàng đầu đang tuyển dụng','Top companies hiring now')}</h2>
      <p>{tr(lang,'Khám phá cơ hội từ các doanh nghiệp đã được LàmViệc360 xem xét và phê duyệt.','Explore opportunities from companies reviewed and approved by LàmViệc360.')}</p>
    </Reveal>
    <div className="lv-company-grid">{window.LVData.companies.slice(0,6).map(c=><Reveal key={c.id}><CompanyCard c={c} lang={lang}/></Reveal>)}</div>
    <Reveal style={{textAlign:'center',marginTop:'var(--space-10)'}}><a href="companies.html" className="lv-view-all">{tr(lang,'Xem tất cả công ty ','View all companies ')}<Icon name="arrow-right" size={16}/></a></Reveal>
  </section>;
}
function DashboardPreview({lang}){
  const[tab,setTab]=React.useState(0);
  const tabs=lang==='VI'?['Việc làm gợi ý','Việc đã lưu','Đã ứng tuyển','Phỏng vấn']:['Recommended','Saved jobs','Applied','Interviews'];
  const jobs=window.LVData.jobs;
  const rows=[jobs.slice(0,3),jobs.slice(3,5),jobs.slice(1,4),jobs.slice(0,2)][tab];
  const stages=lang==='VI'?['Đang xét duyệt','Danh sách rút gọn','Phỏng vấn']:['Under Review','Shortlisted','Interview'];
  return <section className="lv-section lv-section-blue" id="dashboard">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'HỒ SƠ CỦA BẠN','YOUR DASHBOARD')}</span>
      <h2>{tr(lang,'Quản lý hành trình tìm việc của bạn','Manage your job search in one place')}</h2>
    </Reveal>
    <Reveal><div className="lv-preview">
      <div className="lv-preview-head">
        <div><strong style={{fontSize:'var(--text-md)'}}>{tr(lang,'Hồ sơ của bạn','Your profile')}</strong>
          <p style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)',marginTop:'var(--space-1)'}}>{tr(lang,'Hoàn thiện 80% — thêm kỹ năng để nhận gợi ý tốt hơn','80% complete — add skills for better recommendations')}</p></div>
        <Button variant="secondary" size="sm" onClick={()=>location.href='register.html'}>{tr(lang,'Hoàn thiện hồ sơ','Complete profile')}</Button>
      </div>
      <div className="lv-progress"><i style={{width:'80%'}}></i></div>
      <div className="lv-preview-stats">
        <div className="lv-stat"><span>{tr(lang,'Việc gợi ý','Recommended')}</span><strong>12</strong></div>
        <div className="lv-stat"><span>{tr(lang,'Việc đã lưu','Saved jobs')}</span><strong>5</strong></div>
        <div className="lv-stat"><span>{tr(lang,'Đã ứng tuyển','Applied')}</span><strong>8</strong></div>
        <div className="lv-stat"><span>{tr(lang,'Phỏng vấn','Interviews')}</span><strong>2</strong></div>
      </div>
      <div className="lv-filter-row" style={{justifyContent:'flex-start',marginBottom:0}}>
        {tabs.map((t,i)=><button key={t} className={`lv-filter-chip ${tab===i?'active':''}`} aria-pressed={tab===i} onClick={()=>setTab(i)}>{t}</button>)}
      </div>
      <div className="lv-dash-list">{rows.map((j,i)=><div key={j.id} className="lv-dash-row">
        <div className="lv-job-logo" style={{width:36,height:36,fontSize:12}} aria-hidden="true">{j.company.slice(0,2).toUpperCase()}</div>
        <div className="lv-dash-row-info"><strong>{tr(lang,j.titleVi,j.title)}</strong><span>{j.company} · {tr(lang,j.locationVi,j.location)}</span></div>
        <Badge tone={tab===3?'success':'brand'}>{tab===0?tr(lang,'Phù hợp cao','Strong match'):tab===1?tr(lang,'Đã lưu','Saved'):stages[i%3]}</Badge>
      </div>)}</div>
    </div></Reveal>
  </section>;
}
function FinalCTA({lang}){
  return <Reveal as="section" className="lv-final-cta lv-final-cta-blue">
    <h2>{tr(lang,'Cơ hội tiếp theo của bạn bắt đầu từ đây.','Your next opportunity starts here.')}</h2>
    <p>{tr(lang,'Tạo tài khoản miễn phí và bắt đầu ứng tuyển những công việc phù hợp với kỹ năng của bạn.','Create your free account and start applying to jobs that match your skills.')}</p>
    <div className="lv-final-cta-buttons">
      <Button variant="primary" size="lg" style={{background:'var(--surface-card)',color:'var(--blue-700)'}} onClick={()=>location.href='register.html'}>{tr(lang,'Tạo tài khoản Người tìm việc','Create Your Job Seeker Account')}</Button>
      <Button variant="ghost" size="lg" style={{color:'var(--text-inverse)',border:'1.5px solid rgba(255,255,255,0.5)'}} onClick={()=>location.href='jobs.html'}>{tr(lang,'Tìm việc làm','Find Jobs')}</Button>
    </div>
  </Reveal>;
}
function App(){
  const[lang,setLang]=useLang();
  const quotes=[
    {name:'Nguyễn Thị Lan',role:'Backend Engineer',roleVi:'Kỹ sư Backend',en:'I applied to four roles in one evening using my saved profile. Two came back within a week and I could see exactly where each application stood.',vi:'Tôi đã ứng tuyển bốn vị trí trong một buổi tối nhờ hồ sơ đã lưu. Hai nơi phản hồi trong vòng một tuần và tôi luôn biết rõ trạng thái từng đơn.'},
    {name:'Trần Văn Minh',role:'Marketing Specialist',roleVi:'Chuyên viên Marketing',en:'The recommendations actually matched what I do. I found a role in Da Nang that I would never have searched for myself.',vi:'Các gợi ý thực sự phù hợp với công việc của tôi. Tôi tìm được một vị trí ở Đà Nẵng mà tự mình sẽ không nghĩ đến.'},
    {name:'Lê Thị Hoa',role:'Product Designer',roleVi:'Thiết kế Sản phẩm',en:'Being able to prepare with questions related to the actual role made the interview far less stressful.',vi:'Việc luyện tập với câu hỏi liên quan trực tiếp đến vị trí ứng tuyển giúp buổi phỏng vấn bớt căng thẳng hơn nhiều.'}
  ];
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="index.html" app="seeker"/>
    <main>
      <Hero lang={lang}/>
      <WhyUs lang={lang}/>
      <HowItWorks lang={lang}/>
      <FeaturedJobs lang={lang}/>
      <TopCompanies lang={lang}/>
      <DashboardPreview lang={lang}/>
      <Testimonials lang={lang} items={quotes} eyebrow={tr(lang,'CÂU CHUYỆN THÀNH CÔNG','SUCCESS STORIES')} title={tr(lang,'Những người đã tìm được công việc phù hợp','People who found the right role')}/>
      <FinalCTA lang={lang}/>
    </main>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
