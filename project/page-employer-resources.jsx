const{Button,Card,Badge}=window.LMViC360DesignSystem_20f8b1;
const RES=[
  {cat:['Tuyển dụng','Hiring'],t:['Viết tin tuyển dụng thu hút đúng ứng viên','Writing a job post that attracts the right people'],d:['Cấu trúc mô tả công việc rõ ràng giúp giảm số hồ sơ không phù hợp.','A clear job description structure that reduces unsuitable applications.'],r:['7 phút đọc','7 min read']},
  {cat:['Phỏng vấn','Interviews'],t:['Xây dựng bộ câu hỏi phỏng vấn thống nhất','Building a consistent interview scorecard'],d:['Cách đánh giá ứng viên theo cùng một tiêu chí để so sánh công bằng.','How to evaluate candidates against the same criteria for fair comparison.'],r:['6 phút đọc','6 min read']},
  {cat:['Quy trình','Process'],t:['Giảm thời gian tuyển dụng mà không hạ chuẩn','Reducing time-to-hire without lowering the bar'],d:['Những điểm nghẽn thường gặp trong pipeline và cách xử lý.','Common pipeline bottlenecks and how to address them.'],r:['8 phút đọc','8 min read']},
  {cat:['Thương hiệu','Employer brand'],t:['Hồ sơ doanh nghiệp khiến ứng viên muốn ứng tuyển','A company profile candidates want to apply to'],d:['Những thông tin ứng viên thực sự tìm kiếm trước khi nộp hồ sơ.','What candidates actually look for before they apply.'],r:['5 phút đọc','5 min read']},
  {cat:['Đội ngũ','Team'],t:['Phối hợp tuyển dụng giữa nhân sự và quản lý','Coordinating hiring between HR and managers'],d:['Phân chia vai trò và quyền truy cập để quy trình chạy trôi chảy.','Splitting roles and access so the process keeps moving.'],r:['6 phút đọc','6 min read']},
  {cat:['AI','AI'],t:['Dùng AI trong tuyển dụng một cách có trách nhiệm','Using AI in recruitment responsibly'],d:['AI hỗ trợ ở đâu, và tại sao con người vẫn phải quyết định.','Where AI helps, and why people must still decide.'],r:['9 phút đọc','9 min read']}
];
function App(){
  const[lang,setLang]=useLang();
  const[cat,setCat]=React.useState('');
  const cats=[...new Set(RES.map(r=>tr(lang,r.cat[0],r.cat[1])))];
  const list=RES.filter(r=>!cat||tr(lang,r.cat[0],r.cat[1])===cat);
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="employer-resources.html" app="employer"/>
    <main>
      <PageHead lang={lang} home="employers.html" crumb={tr(lang,'Tài nguyên','Resources')}
        title={tr(lang,'Hướng dẫn thực tế cho đội ngũ tuyển dụng.','Practical guides for hiring teams.')}
        desc={tr(lang,'Những bài viết ngắn về đăng tin, phỏng vấn, quy trình và tuyển dụng có trách nhiệm.','Short reads on postings, interviews, process and responsible hiring.')}/>
      <section className="lv-section" style={{paddingTop:'var(--space-12)'}}>
        <div className="lv-filter-row" style={{justifyContent:'flex-start'}}>
          <button className={`lv-filter-chip ${!cat?'active':''}`} onClick={()=>setCat('')}>{tr(lang,'Tất cả','All')}</button>
          {cats.map(c=><button key={c} className={`lv-filter-chip ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <div className="lv-res-grid">{list.map(r=><Reveal key={r.t[1]}><article className="lv-res-card">
          <span className="lv-res-cat">{tr(lang,r.cat[0],r.cat[1])}</span>
          <h3>{tr(lang,r.t[0],r.t[1])}</h3>
          <p>{tr(lang,r.d[0],r.d[1])}</p>
          <div className="lv-res-foot"><span>{tr(lang,r.r[0],r.r[1])}</span>
            <a href="#" className="lv-job-view" onClick={e=>e.preventDefault()}>{tr(lang,'Đọc bài ','Read ')}<Icon name="arrow-right" size={14}/></a></div>
        </article></Reveal>)}</div>
      </section>
      <section className="lv-section lv-section-blue">
        <Reveal className="lv-section-head"><h2>{tr(lang,'Cần trợ giúp với không gian làm việc của bạn?','Need help with your workspace?')}</h2>
          <p>{tr(lang,'Trung tâm hỗ trợ giải đáp câu hỏi về tin tuyển dụng, ứng viên, đội ngũ và thanh toán.','The Help Center covers postings, candidates, team access and billing.')}</p></Reveal>
        <div className="lv-sol-grid">{[['file-plus','Tin tuyển dụng','Job postings'],['users','Ứng viên & pipeline','Candidates & pipeline'],['users-round','Đội ngũ & quyền truy cập','Team & access'],['credit-card','Gói & thanh toán','Plans & billing'],['shield-check','Xác thực doanh nghiệp','Company verification'],['bar-chart-3','Báo cáo','Reporting']].map(x=>
          <Reveal key={x[2]}><div className="lv-sol-card">
            <div className="lv-sol-icon"><Icon name={x[0]} size={20}/></div>
            <h3>{tr(lang,x[1],x[2])}</h3>
            <a href="#" className="lv-job-view" onClick={e=>e.preventDefault()}>{tr(lang,'Xem bài viết ','Browse articles ')}<Icon name="arrow-right" size={14}/></a>
          </div></Reveal>)}</div>
      </section>
      <Reveal as="section" className="lv-final-cta lv-final-cta-navy">
        <h2>{tr(lang,'Bắt đầu tuyển dụng cùng LàmViệc360','Start hiring with LàmViệc360')}</h2>
        <p>{tr(lang,'Đăng ký doanh nghiệp, được xác thực và đăng tin tuyển dụng đầu tiên.','Register your company, get verified and publish your first job.')}</p>
        <div className="lv-final-cta-buttons">
          <Button variant="primary" size="lg" onClick={()=>location.href='company-register.html'}>{tr(lang,'Bắt đầu ngay','Get Started')}</Button>
          <Button variant="ghost" size="lg" style={{color:'var(--text-inverse)',border:'1.5px solid rgba(255,255,255,0.5)'}} onClick={()=>location.href='solutions.html'}>{tr(lang,'Khám phá giải pháp','Explore Solutions')}</Button>
        </div>
      </Reveal>
    </main>
    <Footer lang={lang} setLang={setLang} app="employer"/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
