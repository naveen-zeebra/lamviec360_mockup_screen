const{Button,Badge,Input}=window.LMViC360DesignSystem_20f8b1;
function App(){
  const[lang,setLang]=useLang();
  const[email,setEmail]=React.useState('');
  const[pw,setPw]=React.useState('');
  const[remember,setRemember]=React.useState(true);
  const[toast,setToast]=useToast();
  const side=<React.Fragment>
    <Badge tone="brand">{tr(lang,'Nhà tuyển dụng','For employers')}</Badge>
    <h2>{tr(lang,'Tuyển dụng tốt hơn. Xây dựng đội ngũ mạnh hơn.','Hire better talent. Build stronger teams.')}</h2>
    <ul>{(lang==='VI'?['Đăng tin tuyển dụng và tiếp cận ứng viên phù hợp.','Quản lý toàn bộ pipeline ứng viên ở một nơi.','Mời đội ngũ tham gia với quyền truy cập theo vai trò.','Theo dõi hiệu quả tuyển dụng bằng dữ liệu.']
      :['Publish jobs and reach qualified candidates.','Manage your whole candidate pipeline in one place.','Invite your team with role-based access.','Track hiring performance with real data.']).map(p=>
      <li key={p}><Icon name="check" size={16}/><span>{p}</span></li>)}</ul>
    <a href="solutions.html" style={{color:'var(--blue-300)',fontWeight:600,fontSize:'var(--text-sm)'}}>{tr(lang,'Khám phá giải pháp →','Explore solutions →')}</a>
  </React.Fragment>;
  return <React.Fragment>
    <AuthShell lang={lang} setLang={setLang} app="employer" side={side}>
      <h1>{tr(lang,'Đăng nhập Doanh nghiệp','Employer Login')}</h1>
      <p>{tr(lang,'Đăng nhập vào không gian làm việc tuyển dụng của doanh nghiệp bạn.','Log in to your company hiring workspace.')}</p>
      <SocialAuth lang={lang} providers={[{mark:'G',label:'Google'},{mark:'MS',label:'Microsoft'}]}/>
      <div className="lv-divider-text">{tr(lang,'hoặc dùng email công việc','or use your work email')}</div>
      <form style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}} onSubmit={(e)=>{e.preventDefault();setToast(tr(lang,'Đây là bản mẫu — chưa có tài khoản thật','Prototype only — no real accounts yet'));}}>
        <Field><Input label={tr(lang,'Email công việc','Work email')} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="hr@company.com"/></Field>
        <Field><Input label={tr(lang,'Mật khẩu','Password')} type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••"/></Field>
        <div className="lv-form-row">
          <Check label={tr(lang,'Ghi nhớ đăng nhập','Remember me')} checked={remember} onChange={()=>setRemember(v=>!v)}/>
          <a href="#" onClick={e=>{e.preventDefault();setToast(tr(lang,'Liên kết đặt lại mật khẩu sẽ được gửi qua email','A reset link would be emailed to you'));}} style={{fontWeight:600}}>{tr(lang,'Quên mật khẩu?','Forgot password?')}</a>
        </div>
        <Button variant="primary" size="lg" style={{width:'100%',justifyContent:'center'}}>{tr(lang,'Đăng nhập','Login')}</Button>
      </form>
      <p className="lv-auth-note">{tr(lang,'Doanh nghiệp của bạn chưa có tài khoản?','Company not registered yet?')}{' '}
        <a href="company-register.html" style={{fontWeight:700}}>{tr(lang,'Tạo tài khoản Doanh nghiệp','Create Company Account')}</a></p>
      <div className="lv-cross-auth">
        <strong>{tr(lang,'Bạn đang tìm việc?','Looking for a job?')}</strong>
        <a href="login.html">{tr(lang,'Đến trang Đăng nhập Người tìm việc','Go to Job Seeker Login')} <Icon name="arrow-right" size={14}/></a>
      </div>
    </AuthShell>
    <Footer lang={lang} setLang={setLang} app="employer"/>
    <Toast msg={toast}/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
