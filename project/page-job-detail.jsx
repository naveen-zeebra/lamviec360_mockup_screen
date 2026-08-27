const{Button,Card,Badge}=window.LMViC360DesignSystem_20f8b1;
const STAGES=[['Applied','Đã nộp'],['Under Review','Đang xét duyệt'],['Shortlisted','Danh sách rút gọn'],['Interview','Phỏng vấn'],['Offer','Đề nghị'],['Hired','Được tuyển']];
function App(){
  const[lang,setLang]=useLang();
  const[saved,setSaved]=React.useState(false);
  const[applied,setApplied]=React.useState(false);
  const[toast,setToast]=React.useState('');
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2200);return()=>clearTimeout(t);},[toast]);
  const id=parseInt(new URLSearchParams(location.search).get('id')||'1',10);
  const job=window.LVData.jobs.find(j=>j.id===id)||window.LVData.jobs[0];
  const related=window.LVData.jobs.filter(j=>j.id!==job.id&&(j.industry===job.industry||j.company===job.company)).slice(0,3);
  const resp=lang==='VI'?['Tham gia thiết kế, xây dựng và bảo trì các tính năng của sản phẩm.','Hợp tác với thiết kế, sản phẩm và các kỹ sư khác trong nhóm.','Xem xét mã nguồn và góp phần nâng cao chất lượng kỹ thuật.','Theo dõi và cải thiện hiệu năng, độ tin cậy của hệ thống.']
    :['Help design, build and maintain product features.','Work closely with design, product and other engineers on the team.','Review code and contribute to overall technical quality.','Monitor and improve system performance and reliability.'];
  const reqs=lang==='VI'?['Kinh nghiệm thực tế phù hợp với cấp bậc của vị trí.','Thành thạo các kỹ năng chính được liệt kê cho vai trò này.','Khả năng giao tiếp rõ ràng bằng tiếng Việt; tiếng Anh là một lợi thế.','Tinh thần hợp tác và chủ động trong công việc nhóm.']
    :['Relevant hands-on experience for the level of the role.','Working proficiency in the core skills listed for this role.','Clear communication in Vietnamese; English is an advantage.','A collaborative, self-directed approach to teamwork.'];
  const bens=lang==='VI'?['Bảo hiểm theo quy định pháp luật','Thưởng theo hiệu quả công việc','Ngân sách học tập và phát triển','Chính sách làm việc linh hoạt']
    :['Statutory insurance coverage','Performance-based bonus','Learning and development budget','Flexible working arrangements'];
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="jobs.html" app="seeker"/>
    <main>
      <section className="lv-page-head"><div className="lv-page-head-inner">
        <div className="lv-crumbs"><a href="index.html">{tr(lang,'Trang chủ','Home')}</a><Icon name="chevron-right" size={14}/><a href="jobs.html">{tr(lang,'Tìm việc làm','Find Jobs')}</a><Icon name="chevron-right" size={14}/><span>{tr(lang,job.titleVi,job.title)}</span></div>
        <div style={{display:'flex',gap:'var(--space-4)',alignItems:'flex-start',flexWrap:'wrap'}}>
          <div className="lv-company-logo" style={{width:60,height:60,fontSize:'var(--text-lg)'}} aria-hidden="true">{job.company.slice(0,2).toUpperCase()}</div>
          <div style={{flex:1,minWidth:260}}>
            <h1 style={{fontSize:'var(--text-3xl)',marginBottom:'var(--space-2)'}}>{tr(lang,job.titleVi,job.title)}</h1>
            <div className="lv-job-company" style={{fontSize:'var(--text-base)',marginBottom:'var(--space-3)'}}>{job.company}
              {job.verified&&<Badge tone="brand"><Icon name="shield-check" size={11}/> {tr(lang,'Doanh nghiệp đã xác thực','Verified Company')}</Badge>}</div>
            <div className="lv-job-meta" style={{marginBottom:0}}>
              <span><Icon name="map-pin" size={15}/>{tr(lang,job.locationVi,job.location)}</span>
              <span><Icon name="wallet" size={15}/>{job.salary}</span>
              <span><Icon name="briefcase" size={15}/>{tr(lang,window.FILTER_VI[job.type]||job.type,job.type)} · {tr(lang,job.modeVi,job.mode)}</span>
              <span><Icon name="clock" size={15}/>{tr(lang,job.postedVi,job.posted)}</span>
            </div>
          </div>
        </div>
      </div></section>
      <div className="lv-detail-layout">
        <div>
          <div className="lv-detail-card">
            <h2>{tr(lang,'Về vị trí này','About the role')}</h2>
            <p>{tr(lang,`${job.company} đang tìm kiếm một ${job.titleVi} tại ${job.locationVi}. Đây là vị trí ${window.FILTER_VI[job.type]||job.type} theo hình thức ${job.modeVi}, phù hợp với cấp bậc ${job.levelVi}.`,`${job.company} is looking for a ${job.title} in ${job.location}. This is a ${job.type.toLowerCase()} role working ${job.mode.toLowerCase()}, suited to ${job.level.toLowerCase()} candidates.`)}</p>
            <h2>{tr(lang,'Trách nhiệm chính','Responsibilities')}</h2>
            <ul>{resp.map(r=><li key={r}>{r}</li>)}</ul>
            <h2>{tr(lang,'Yêu cầu','Requirements')}</h2>
            <ul>{reqs.map(r=><li key={r}>{r}</li>)}</ul>
            <h2>{tr(lang,'Kỹ năng','Skills')}</h2>
            <div className="lv-job-tags" style={{marginBottom:0}}>{job.skills.map(s=><Badge key={s} tone="neutral">{s}</Badge>)}</div>
            <h2>{tr(lang,'Quyền lợi','Benefits')}</h2>
            <ul>{bens.map(b=><li key={b}>{b}</li>)}</ul>
            <h2>{tr(lang,'Quy trình tuyển dụng','Hiring process')}</h2>
            <div className="lv-journey" style={{marginTop:'var(--space-5)',maxWidth:'100%'}}>{STAGES.slice(0,4).map((s,i)=><React.Fragment key={s[0]}>
              <div className="lv-journey-step"><div className="lv-journey-dot">{`0${i+1}`}</div><span>{tr(lang,s[1],s[0])}</span></div>
              {i<3&&<div className="lv-journey-bar"></div>}
            </React.Fragment>)}</div>
          </div>
          {related.length>0&&<section style={{marginTop:'var(--space-10)'}}>
            <h2 style={{fontSize:'var(--text-xl)',marginBottom:'var(--space-5)'}}>{tr(lang,'Việc làm tương tự','Similar jobs')}</h2>
            <div className="lv-job-list">{related.map(j=><JobRow key={j.id} job={j} lang={lang}/>)}</div>
          </section>}
        </div>
        <aside className="lv-apply-card">
          <strong style={{fontSize:'var(--text-md)'}}>{tr(lang,'Ứng tuyển vị trí này','Apply for this role')}</strong>
          <div className="lv-apply-row"><span>{tr(lang,'Mức lương','Salary')}</span><strong>{job.salary}</strong></div>
          <div className="lv-apply-row"><span>{tr(lang,'Hình thức','Type')}</span><strong>{tr(lang,window.FILTER_VI[job.type]||job.type,job.type)}</strong></div>
          <div className="lv-apply-row"><span>{tr(lang,'Cách làm việc','Work mode')}</span><strong>{tr(lang,job.modeVi,job.mode)}</strong></div>
          <div className="lv-apply-row"><span>{tr(lang,'Cấp bậc','Level')}</span><strong>{tr(lang,job.levelVi,job.level)}</strong></div>
          <div className="lv-apply-row"><span>{tr(lang,'Địa điểm','Location')}</span><strong>{tr(lang,job.locationVi,job.location)}</strong></div>
          <Button variant="primary" size="lg" style={{width:'100%',justifyContent:'center'}} disabled={applied}
            onClick={()=>{setApplied(true);setToast(tr(lang,'Đã gửi đơn ứng tuyển','Application submitted'));}}>
            {applied?tr(lang,'Đã ứng tuyển','Applied'):tr(lang,'Ứng tuyển ngay','Apply Now')}</Button>
          <Button variant="secondary" style={{width:'100%',justifyContent:'center'}}
            onClick={()=>{setSaved(s=>!s);setToast(saved?tr(lang,'Đã bỏ lưu','Removed from saved jobs'):tr(lang,'Đã lưu việc làm','Job saved'));}}>
            <Icon name="heart" size={16} style={{fill:saved?'currentColor':'none'}}/> {saved?tr(lang,'Đã lưu','Saved'):tr(lang,'Lưu việc làm','Save Job')}</Button>
          <p style={{fontSize:12,color:'var(--text-tertiary)',lineHeight:'var(--leading-relaxed)'}}>{tr(lang,'Bạn cần hồ sơ LàmViệc360 để ứng tuyển. Thông tin của bạn chỉ được chia sẻ khi bạn đồng ý.','You need a LàmViệc360 profile to apply. Your details are shared only with your consent.')}</p>
          <a href={`jobs.html?company=${encodeURIComponent(job.company)}`} className="lv-job-view">{tr(lang,'Tất cả việc làm tại công ty này ','All jobs at this company ')}<Icon name="arrow-right" size={14}/></a>
        </aside>
      </div>
    </main>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
    <Toast msg={toast}/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
