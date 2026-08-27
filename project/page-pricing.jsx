const{Button,Card,Badge}=window.LMViC360DesignSystem_20f8b1;
function App(){
  const[lang,setLang]=useLang();
  const[annual,setAnnual]=React.useState(false);
  const[open,setOpen]=React.useState(0);
  const plans=lang==='VI'?[
    {n:'Miễn phí',t:'Bắt đầu miễn phí',d:'Dành cho doanh nghiệp mới bắt đầu tuyển dụng.',p:'0 ₫',c:'Bắt đầu miễn phí',v:'secondary'},
    {n:'Chuyên nghiệp',t:'Phát triển tuyển dụng',d:'Dành cho các đội ngũ tuyển dụng đang mở rộng.',p:'Liên hệ để nhận báo giá',c:'Chọn gói Chuyên nghiệp',v:'primary',f:true},
    {n:'Doanh nghiệp',t:'Mở rộng quy mô tuyển dụng',d:'Dành cho tổ chức có yêu cầu tuyển dụng nâng cao.',p:'Liên hệ để nhận báo giá',c:'Liên hệ Kinh doanh',v:'secondary'}]
    :[{n:'Free',t:'Start for free',d:'For companies getting started with recruitment.',p:'0 VND',c:'Start Free',v:'secondary'},
    {n:'Professional',t:'Grow your hiring',d:'For growing recruitment teams.',p:'Contact for pricing',c:'Choose Professional',v:'primary',f:true},
    {n:'Enterprise',t:'Scale your recruitment',d:'For organizations with advanced recruitment requirements.',p:'Contact for pricing',c:'Contact Sales',v:'secondary'}];
  const rows=lang==='VI'?[['Tin tuyển dụng đang hoạt động','1','Nhiều','Không giới hạn'],['Quản lý ứng viên',1,1,1],['Thành viên đội ngũ','1','Nhiều','Không giới hạn'],['Mô tả công việc bằng AI',0,1,1],['Sàng lọc ứng viên bằng AI',0,1,1],['Quyền truy cập theo vai trò',0,1,1],['Trang doanh nghiệp đã xác thực',1,1,1],['Hỗ trợ chuyên biệt',0,0,1]]
    :[['Active job postings','1','Multiple','Unlimited'],['Candidate management',1,1,1],['Team members','1','Multiple','Unlimited'],['AI job descriptions',0,1,1],['AI candidate screening',0,1,1],['Role-based access',0,1,1],['Verified company page',1,1,1],['Dedicated support',0,0,1]];
  const faqs=lang==='VI'?[['LàmViệc360 có miễn phí cho người tìm việc không?','Có. Tìm việc, tạo hồ sơ, ứng tuyển và theo dõi đơn ứng tuyển luôn miễn phí đối với người tìm việc.'],['Doanh nghiệp được xác thực như thế nào?','Sau khi đăng ký, thông tin doanh nghiệp của bạn được xem xét trước khi huy hiệu “Đã xác thực” xuất hiện trên trang và tin tuyển dụng.'],['Giá được tính bằng đơn vị nào?','Đơn vị tiền tệ của nền tảng là VND. Vui lòng liên hệ để nhận báo giá cho gói Chuyên nghiệp và Doanh nghiệp.'],['AI có tự ra quyết định tuyển dụng không?','Không. AI hỗ trợ soạn thảo và so khớp, nhưng mọi quyết định tuyển dụng đều do con người xem xét và quyết định.']]
    :[['Is LàmViệc360 free for job seekers?','Yes. Searching, creating a profile, applying and tracking applications are always free for job seekers.'],['How does company verification work?','After you register, your company details are reviewed before the "Verified" badge appears on your page and job postings.'],['What currency is pricing in?','The platform currency is VND. Contact us for Professional and Enterprise pricing.'],['Does AI make hiring decisions?','No. AI assists with drafting and matching, but every hiring decision is reviewed and made by a person.']];
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="pricing.html" app="employer"/>
    <main>
      <PageHead lang={lang} home="employers.html" crumb={tr(lang,'Bảng giá','Pricing')} title={tr(lang,'Chọn gói phù hợp với nhu cầu tuyển dụng của bạn.','Choose the plan that fits your hiring needs.')} desc={tr(lang,'Miễn phí cho người tìm việc. Các gói dành cho doanh nghiệp được tính bằng VND.','Always free for job seekers. Employer plans are priced in VND.')}/>
      <section className="lv-section" style={{paddingTop:56}}>
        <div className="lv-billing-toggle" style={{marginBottom:'var(--space-10)',marginTop:0}}>
          <span className={!annual?'active':''}>{tr(lang,'Theo tháng','Monthly')}</span>
          <button className={`lv-switch ${annual?'on':''}`} role="switch" aria-checked={annual} aria-label={tr(lang,'Chu kỳ thanh toán','Billing period')} onClick={()=>setAnnual(v=>!v)}><span></span></button>
          <span className={annual?'active':''}>{tr(lang,'Theo năm ','Annual ')}<Badge tone="success">{tr(lang,'Tiết kiệm hơn','Save more')}</Badge></span>
        </div>
        <div className="lv-pricing-grid">{plans.map(p=><Reveal key={p.n}><div className={`lv-price-card ${p.f?'featured':''}`}>
          {p.f&&<span className="lv-price-badge">{tr(lang,'Phổ biến nhất','Most popular')}</span>}
          <h3>{p.n}</h3><p className="lv-price-tag">{p.t}</p>
          <div className="lv-price-amount">{p.p}{annual&&p.v!=='free'&&p.n!=='Free'&&p.n!=='Miễn phí'&&<span className="lv-price-note">{tr(lang,'thanh toán theo năm','billed annually')}</span>}</div>
          <p className="lv-price-desc">{p.d}</p>
          <Button variant={p.v} style={{width:'100%',justifyContent:'center'}} onClick={()=>location.href='employer-login.html'}>{p.c}</Button>
        </div></Reveal>)}</div>
      </section>
      <section className="lv-section" style={{paddingTop:0}}>
        <Reveal className="lv-section-head" style={{marginBottom:'var(--space-8)'}}><h2>{tr(lang,'So sánh các gói','Compare plans')}</h2></Reveal>
        <Reveal><table className="lv-compare">
          <thead><tr><th>{tr(lang,'Tính năng','Feature')}</th>{plans.map(p=><th key={p.n}>{p.n}</th>)}</tr></thead>
          <tbody>{rows.map(r=><tr key={r[0]}><td>{r[0]}</td>{r.slice(1).map((v,i)=><td key={i}>{v===1?<Icon name="check" size={16}/>:v===0?<span style={{color:'var(--text-tertiary)'}}>—</span>:v}</td>)}</tr>)}</tbody>
        </table></Reveal>
      </section>
      <section className="lv-section lv-section-blue">
        <Reveal className="lv-section-head"><h2>{tr(lang,'Câu hỏi thường gặp','Frequently asked questions')}</h2></Reveal>
        <div className="lv-faq">{faqs.map((f,i)=><Reveal key={f[0]}><div className="lv-faq-item">
          <button className="lv-faq-q" aria-expanded={open===i} onClick={()=>setOpen(open===i?-1:i)}>{f[0]}<Icon name={open===i?'minus':'plus'} size={18}/></button>
          {open===i&&<div className="lv-faq-a">{f[1]}</div>}
        </div></Reveal>)}</div>
      </section>
      <Reveal as="section" className="lv-final-cta lv-final-cta-navy">
        <h2>{tr(lang,'Sẵn sàng bắt đầu tuyển dụng?','Ready to start hiring?')}</h2>
        <p>{tr(lang,'Đăng ký doanh nghiệp của bạn, được xác thực và đăng tin tuyển dụng đầu tiên.','Register your company, get verified and post your first job.')}</p>
        <div className="lv-final-cta-buttons">
          <Button variant="primary" size="lg" onClick={()=>location.href='employer-login.html'}>{tr(lang,'Bắt đầu tuyển dụng','Start Hiring')}</Button>
          <Button variant="ghost" size="lg" style={{color:'var(--text-inverse)',border:'1.5px solid rgba(255,255,255,0.5)'}} onClick={()=>location.href='employers.html'}>{tr(lang,'Tìm hiểu thêm','Learn more')}</Button>
        </div>
      </Reveal>
    </main>
    <Footer lang={lang} setLang={setLang} app="employer"/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
