const{Button,Card,Badge,Avatar}=window.LMViC360DesignSystem_20f8b1;
function PipelineVisual({lang}){
  const cols=lang==='VI'?[['Ứng tuyển',3],['Xét duyệt',2],['Rút gọn',2],['Phỏng vấn',1],['Đề nghị',1]]:[['Applied',3],['Review',2],['Shortlist',2],['Interview',1],['Offer',1]];
  const names=['Nguyễn Lan','Trần Minh','Lê Hoa','Phạm Anh','Vũ Nam','Đỗ Hà','Bùi Long','Hồ Mai','Ngô Thu'];
  let k=0;
  return <div className="lv-preview">
    <div className="lv-preview-head">
      <strong style={{fontSize:'var(--text-md)'}}>{tr(lang,'Quy trình tuyển dụng','Hiring pipeline')}</strong>
      <Badge tone="brand">{tr(lang,'9 ứng viên đang xử lý','9 candidates in progress')}</Badge>
    </div>
    <div className="lv-pipeline">{cols.map(c=><div key={c[0]} className="lv-pipe-col">
      <h5>{c[0]} · {c[1]}</h5>
      {Array.from({length:c[1]}).map((_,i)=>{const n=names[k++%names.length];return <div key={i} className="lv-pipe-card"><Avatar name={n} size={20}/>{n}</div>;})}
    </div>)}</div>
    <div className="lv-preview-stats">
      <div className="lv-stat"><span>{tr(lang,'Tin đang tuyển','Active jobs')}</span><strong>8</strong></div>
      <div className="lv-stat"><span>{tr(lang,'Tổng ứng viên','Total applicants')}</span><strong>146</strong></div>
      <div className="lv-stat"><span>{tr(lang,'Đã rút gọn','Shortlisted')}</span><strong>24</strong></div>
      <div className="lv-stat"><span>{tr(lang,'Phỏng vấn tuần này','Interviews')}</span><strong>5</strong></div>
    </div>
  </div>;
}
function Hero({lang}){
  return <section className="lv-hero"><div className="lv-hero-inner">
    <Reveal className="lv-hero-copy">
      <span className="lv-eyebrow">{tr(lang,'DÀNH CHO NHÀ TUYỂN DỤNG','FOR EMPLOYERS')}</span>
      <h1 className="lv-hero-h1">{tr(lang,'Tìm đúng người,','Find the Right People,')}<br/>{tr(lang,'nhanh hơn.','Faster.')}</h1>
      <p className="lv-hero-sub">{tr(lang,'Tiếp cận ứng viên phù hợp, tinh gọn quy trình tuyển dụng, quản lý toàn bộ pipeline và giảm thời gian tuyển dụng.','Reach qualified candidates, streamline recruitment, manage your hiring pipeline and reduce time-to-hire.')}</p>
      <ul className="lv-check-list">
        {(lang==='VI'?['Đăng tin tuyển dụng và tiếp cận ứng viên phù hợp','Quản lý ứng tuyển và rút gọn danh sách ứng viên','Sắp xếp phỏng vấn cùng đội ngũ của bạn','Xây dựng đội ngũ hiệu quả với dữ liệu tuyển dụng']
          :['Publish jobs and reach qualified candidates','Manage applications and shortlist candidates','Coordinate interviews with your team','Build your workforce efficiently with hiring data']).map(x=>
          <li key={x}><Icon name="check" size={16}/><span>{x}</span></li>)}
      </ul>
      <div className="lv-hero-ctas">
        <Button variant="primary" size="lg" onClick={()=>location.href='company-register.html'}>{tr(lang,'Bắt đầu tuyển dụng','Start Hiring')}</Button>
        <Button variant="secondary" size="lg" onClick={()=>location.href='solutions.html'}>{tr(lang,'Khám phá giải pháp','Explore Solutions')}</Button>
      </div>
    </Reveal>
    <Reveal className="lv-hero-visual-wrap"><PipelineVisual lang={lang}/></Reveal>
  </div></section>;
}
function Solutions({lang}){
  const items=lang==='VI'?[
    ['file-plus','Đăng tin tuyển dụng','Tạo và đăng tin chuyên nghiệp với hỗ trợ AI, xem lại trước khi công bố.','solutions.html#posting'],
    ['search','Tìm kiếm ứng viên','Tìm ứng viên theo kỹ năng, kinh nghiệm và địa điểm.','solutions.html#search'],
    ['list-checks','Quản lý ứng tuyển','Theo dõi mọi hồ sơ ứng tuyển qua từng giai đoạn tuyển dụng.','solutions.html#tracking'],
    ['user-check','Rút gọn danh sách','So sánh ứng viên và đánh dấu những người phù hợp nhất.','solutions.html#shortlist'],
    ['calendar','Quản lý phỏng vấn','Lên lịch, ghi chú và phối hợp phỏng vấn cùng đội ngũ.','solutions.html#interviews'],
    ['bar-chart-3','Phân tích tuyển dụng','Theo dõi hiệu quả tin tuyển dụng và thời gian tuyển dụng.','solutions.html#analytics']]
    :[['file-plus','Job Posting','Create and publish professional postings with AI assistance, reviewed before they go live.','solutions.html#posting'],
    ['search','Candidate Search','Find candidates by skills, experience and location.','solutions.html#search'],
    ['list-checks','Applicant Tracking','Follow every application through each stage of your process.','solutions.html#tracking'],
    ['user-check','Candidate Shortlisting','Compare candidates and flag the strongest fits.','solutions.html#shortlist'],
    ['calendar','Interview Management','Schedule, note and coordinate interviews with your team.','solutions.html#interviews'],
    ['bar-chart-3','Hiring Analytics','Track posting performance and time-to-hire.','solutions.html#analytics']];
  return <section className="lv-section lv-section-blue" id="solutions">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'GIẢI PHÁP TUYỂN DỤNG','HIRING SOLUTIONS')}</span>
      <h2>{tr(lang,'Mọi thứ cho việc tuyển dụng, trong một nơi.','Everything hiring, in one workspace.')}</h2>
    </Reveal>
    <div className="lv-sol-grid">{items.map(x=><Reveal key={x[1]}><div className="lv-sol-card">
      <div className="lv-sol-icon"><Icon name={x[0]} size={22}/></div>
      <h3>{x[1]}</h3><p>{x[2]}</p>
      <a href={x[3]} className="lv-job-view">{tr(lang,'Tìm hiểu thêm ','Learn more ')}<Icon name="arrow-right" size={14}/></a>
    </div></Reveal>)}</div>
  </section>;
}
function HowHiringWorks({lang}){
  const steps=lang==='VI'?[['01','Tạo hồ sơ doanh nghiệp','Đăng ký và được xác thực để ứng viên tin tưởng.'],['02','Đăng tin tuyển dụng','Tạo tin với mô tả rõ ràng và yêu cầu cụ thể.'],['03','Nhận hồ sơ ứng tuyển','Ứng viên phù hợp ứng tuyển trực tiếp vào pipeline của bạn.'],['04','Xem xét và rút gọn','So sánh ứng viên và chọn ra danh sách ngắn.'],['05','Phỏng vấn ứng viên','Lên lịch và ghi chú đánh giá cùng đội ngũ.'],['06','Tuyển đúng người','Gửi đề nghị và hoàn tất quy trình tuyển dụng.']]
    :[['01','Create company profile','Register and get verified so candidates can trust you.'],['02','Post a job','Publish a posting with a clear description and requirements.'],['03','Receive applications','Qualified candidates apply straight into your pipeline.'],['04','Review and shortlist','Compare candidates and build your shortlist.'],['05','Interview candidates','Schedule and record evaluations with your team.'],['06','Hire the right person','Send the offer and close out the process.']];
  return <section className="lv-section" id="how">
    <Reveal className="lv-section-head"><h2>{tr(lang,'Quy trình tuyển dụng hoạt động thế nào','How employer hiring works')}</h2></Reveal>
    <div className="lv-steps" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      {steps.map(s=><Reveal key={s[0]}><div className="lv-step"><span className="lv-step-num">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div></Reveal>)}
    </div>
  </section>;
}
function DashboardPreview({lang}){
  const[tab,setTab]=React.useState(0);
  const tabs=lang==='VI'?['Tổng quan','Tin tuyển dụng','Ứng viên','Phân tích']:['Overview','Jobs','Candidates','Analytics'];
  const cands=lang==='VI'?[['Nguyễn Thị Lan','Kỹ sư Backend','Phỏng vấn'],['Trần Văn Minh','Chuyên viên Marketing','Đề nghị'],['Lê Thị Hoa','Thiết kế UI/UX','Đang xét duyệt'],['Phạm Quốc Anh','Kỹ sư DevOps','Danh sách rút gọn']]
    :[['Nguyễn Thị Lan','Backend Engineer','Interview'],['Trần Văn Minh','Marketing Specialist','Offer'],['Lê Thị Hoa','UI/UX Designer','Under Review'],['Phạm Quốc Anh','DevOps Engineer','Shortlisted']];
  return <section className="lv-section lv-section-blue" id="dashboard">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'KHÔNG GIAN LÀM VIỆC','YOUR WORKSPACE')}</span>
      <h2>{tr(lang,'Toàn bộ hoạt động tuyển dụng trong một bảng điều khiển','All your hiring activity in one dashboard')}</h2>
      <p>{tr(lang,'Không gian làm việc riêng của doanh nghiệp bạn tại {company}.lamviec360.com','Your company gets a dedicated workspace at {company}.lamviec360.com')}</p>
    </Reveal>
    <Reveal><div className="lv-preview">
      <div className="lv-filter-row" style={{justifyContent:'flex-start',marginBottom:0}}>
        {tabs.map((t,i)=><button key={t} className={`lv-filter-chip ${tab===i?'active':''}`} aria-pressed={tab===i} onClick={()=>setTab(i)}>{t}</button>)}
      </div>
      <div className="lv-preview-stats">
        <div className="lv-stat"><span>{tr(lang,'Tin đang tuyển','Active jobs')}</span><strong>8</strong></div>
        <div className="lv-stat"><span>{tr(lang,'Tổng ứng viên','Total applicants')}</span><strong>146</strong></div>
        <div className="lv-stat"><span>{tr(lang,'Đã rút gọn','Shortlisted')}</span><strong>24</strong></div>
        <div className="lv-stat"><span>{tr(lang,'Phỏng vấn','Interviews')}</span><strong>5</strong></div>
      </div>
      {tab===3?<div>
        <div className="lv-bars" role="img" aria-label={tr(lang,'Số lượng ứng tuyển theo tuần','Applications per week')}>
          {[45,62,38,71,55,84].map((h,i)=><div key={i} style={{height:h+'%'}}></div>)}
        </div>
        <p style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)',marginTop:'var(--space-3)'}}>{tr(lang,'Số lượng ứng tuyển trong 6 tuần gần nhất','Applications received over the last 6 weeks')}</p>
      </div>
      :tab===1?<div className="lv-dash-list">{window.LVData.jobs.slice(0,4).map(j=><div key={j.id} className="lv-dash-row">
        <div className="lv-job-logo" style={{width:36,height:36,fontSize:12}} aria-hidden="true">{j.company.slice(0,2).toUpperCase()}</div>
        <div className="lv-dash-row-info"><strong>{tr(lang,j.titleVi,j.title)}</strong><span>{tr(lang,j.locationVi,j.location)} · {tr(lang,window.FILTER_VI[j.type],j.type)}</span></div>
        <Badge tone="success">{tr(lang,'Đang tuyển','Active')}</Badge></div>)}</div>
      :<div className="lv-dash-list">{cands.map(c=><div key={c[0]} className="lv-dash-row"><Avatar name={c[0]} size={32}/>
        <div className="lv-dash-row-info"><strong>{c[0]}</strong><span>{c[1]}</span></div><Badge tone="brand">{c[2]}</Badge></div>)}</div>}
    </div></Reveal>
  </section>;
}
function CandidateDiscovery({lang}){
  const items=lang==='VI'?[['search','Tìm kiếm ứng viên nâng cao','Tìm theo từ khóa, chức danh và kinh nghiệm cụ thể.'],['puzzle','So khớp kỹ năng','So sánh kỹ năng của ứng viên với yêu cầu công việc.'],['briefcase','Lọc theo kinh nghiệm','Giới hạn theo cấp bậc và số năm kinh nghiệm.'],['map-pin','Lọc theo địa điểm','Tìm ứng viên theo thành phố hoặc hình thức làm việc từ xa.'],['sparkles','Gợi ý bằng AI','AI đề xuất ứng viên phù hợp để bạn xem xét — quyết định vẫn thuộc về bạn.']]
    :[['search','Advanced candidate search','Search by keyword, job title and specific experience.'],['puzzle','Skill matching','Compare candidate skills against your job requirements.'],['briefcase','Experience filters','Narrow by seniority and years of experience.'],['map-pin','Location filters','Find candidates by city or remote availability.'],['sparkles','AI-powered recommendations','AI surfaces candidates worth reviewing — the decision stays yours.']];
  return <section className="lv-section" id="discovery">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow">{tr(lang,'TÌM KIẾM ỨNG VIÊN','CANDIDATE DISCOVERY')}</span>
      <h2>{tr(lang,'Tiếp cận đúng ứng viên, nhanh hơn','Reach the right candidates sooner')}</h2>
    </Reveal>
    <div className="lv-sol-grid">{items.map(x=><Reveal key={x[1]}><div className="lv-sol-card">
      <div className="lv-sol-icon"><Icon name={x[0]} size={22}/></div><h3>{x[1]}</h3><p>{x[2]}</p></div></Reveal>)}</div>
    <Reveal className="lv-human-review" style={{color:'var(--text-secondary)',marginTop:'var(--space-8)'}}>
      <Icon name="shield-check" size={18}/><span>{tr(lang,'AI hỗ trợ sàng lọc — mọi quyết định tuyển dụng đều do con người đưa ra','AI assists with screening — every hiring decision is made by a person')}</span>
    </Reveal>
  </section>;
}
function Benefits({lang}){
  const items=lang==='VI'?[['timer','Tuyển dụng nhanh hơn','Giảm thời gian từ khi đăng tin đến khi tuyển được người.'],['target','So khớp ứng viên tốt hơn','Tập trung thời gian vào những hồ sơ phù hợp nhất.'],['layers','Tuyển dụng tập trung','Mọi tin tuyển dụng, ứng viên và ghi chú ở cùng một nơi.'],['file-minus','Giảm công việc hành chính','Ít bảng tính và email theo dõi thủ công hơn.'],['bar-chart-3','Phân tích tuyển dụng','Hiểu rõ kênh nào mang lại ứng viên tốt nhất.']]
    :[['timer','Faster hiring','Reduce the time between posting a job and making a hire.'],['target','Better candidate matching','Spend your time on the profiles that actually fit.'],['layers','Centralized recruitment','Every posting, candidate and note in one place.'],['file-minus','Reduced administrative work','Fewer spreadsheets and manual follow-up emails.'],['bar-chart-3','Recruitment analytics','Understand which channels bring your best candidates.']];
  return <section className="lv-section lv-section-dark" id="benefits">
    <Reveal className="lv-section-head">
      <span className="lv-eyebrow lv-eyebrow-dark">{tr(lang,'LỢI ÍCH','EMPLOYER BENEFITS')}</span>
      <h2 className="lv-h2-dark">{tr(lang,'Tuyển dụng tốt hơn. Xây dựng đội ngũ mạnh hơn.','Hire better talent. Build stronger teams.')}</h2>
    </Reveal>
    <div className="lv-ai-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>{items.map(x=><Reveal key={x[1]}><div className="lv-ai-card">
      <div className="lv-ai-card-top"><Icon name={x[0]} size={22}/></div>
      <h3>{x[1]}</h3><p className="lv-ai-desc" style={{marginTop:'var(--space-2)'}}>{x[2]}</p></div></Reveal>)}</div>
  </section>;
}
function FinalCTA({lang}){
  return <Reveal as="section" className="lv-final-cta lv-final-cta-navy">
    <h2>{tr(lang,'Sẵn sàng xây dựng đội ngũ tuyệt vời tiếp theo?','Ready to build your next great team?')}</h2>
    <p>{tr(lang,'Đăng ký doanh nghiệp, được xác thực và đăng tin tuyển dụng đầu tiên của bạn.','Register your company, get verified and publish your first job posting.')}</p>
    <div className="lv-final-cta-buttons">
      <Button variant="primary" size="lg" onClick={()=>location.href='company-register.html'}>{tr(lang,'Bắt đầu tuyển dụng ngay','Start Hiring Today')}</Button>
      <Button variant="ghost" size="lg" style={{color:'var(--text-inverse)',border:'1.5px solid rgba(255,255,255,0.5)'}} onClick={()=>location.href='pricing.html'}>{tr(lang,'Xem bảng giá','View Pricing')}</Button>
    </div>
  </Reveal>;
}
function App(){
  const[lang,setLang]=useLang();
  const quotes=[
    {name:'Đặng Hồng Phúc',role:'Head of HR, ABC Technologies',roleVi:'Trưởng phòng Nhân sự, ABC Technologies',en:'We moved our whole pipeline here. Everyone on the hiring team sees the same candidate notes, which cut our review meetings in half.',vi:'Chúng tôi chuyển toàn bộ quy trình sang đây. Cả đội tuyển dụng cùng xem một bộ ghi chú ứng viên, giúp giảm một nửa thời gian họp xét duyệt.'},
    {name:'Vũ Thanh Hà',role:'Recruitment Lead, Sen Vang Group',roleVi:'Trưởng nhóm Tuyển dụng, Sen Vang Group',en:'Posting a role takes minutes now, and the applications arriving are noticeably closer to what we asked for.',vi:'Đăng một tin tuyển dụng giờ chỉ mất vài phút, và hồ sơ nhận được sát với yêu cầu của chúng tôi hơn rõ rệt.'},
    {name:'Lý Quốc Bảo',role:'Operations Director, Dai Duong Viet',roleVi:'Giám đốc Vận hành, Dai Duong Viet',en:'The verified company badge made a real difference — candidates respond to our outreach far more often than before.',vi:'Huy hiệu doanh nghiệp đã xác thực tạo ra khác biệt thật sự — ứng viên phản hồi liên hệ của chúng tôi thường xuyên hơn nhiều.'}
  ];
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="employers.html" app="employer"/>
    <main>
      <Hero lang={lang}/>
      <Solutions lang={lang}/>
      <HowHiringWorks lang={lang}/>
      <DashboardPreview lang={lang}/>
      <CandidateDiscovery lang={lang}/>
      <Benefits lang={lang}/>
      <Testimonials lang={lang} items={quotes} eyebrow={tr(lang,'KHÁCH HÀNG CỦA CHÚNG TÔI','CLIENT STORIES')} title={tr(lang,'Các doanh nghiệp đang tuyển dụng cùng LàmViệc360','Companies hiring with LàmViệc360')}/>
      <FinalCTA lang={lang}/>
    </main>
    <Footer lang={lang} setLang={setLang} app="employer"/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
