const{Button,Badge,Input}=window.LMViC360DesignSystem_20f8b1;
function App(){
  const[lang,setLang]=useLang();
  const[email,setEmail]=React.useState('');
  const[pw,setPw]=React.useState('');
  const[remember,setRemember]=React.useState(true);
  const[toast,setToast]=useToast();
  const side=<React.Fragment>
    <Badge tone="brand">{tr(lang,'Người tìm việc','For job seekers')}</Badge>
    <h2>{tr(lang,'Hành trình nghề nghiệp của bạn, tiếp tục từ đây.','Your career journey, picked up where you left off.')}</h2>
    <ul>{(lang==='VI'?['Xem việc làm được gợi ý cho hồ sơ của bạn.','Ứng tuyển nhanh hơn với thông tin đã lưu.','Theo dõi từng đơn ứng tuyển từ đầu đến cuối.','Chuẩn bị phỏng vấn với câu hỏi phù hợp vị trí.']
      :['See jobs recommended for your profile.','Apply faster using your saved details.','Track every application from start to finish.','Prepare for interviews with role-specific questions.']).map(p=>
      <li key={p}><Icon name="check" size={16}/><span>{p}</span></li>)}</ul>
    <a href="jobs.html" style={{color:'var(--blue-300)',fontWeight:600,fontSize:'var(--text-sm)'}}>{tr(lang,'Khám phá việc làm →','Explore jobs →')}</a>
  </React.Fragment>;
  return <React.Fragment>
    <AuthShell lang={lang} setLang={setLang} app="seeker" side={side}>
      <h1>{tr(lang,'Đăng nhập Người tìm việc','Job Seeker Login')}</h1>
      <p>{tr(lang,'Đăng nhập để tiếp tục tìm việc và quản lý đơn ứng tuyển của bạn.','Log in to continue your job search and manage your applications.')}</p>
      <SocialAuth lang={lang} providers={[{mark:'G',label:'Google'},{mark:'in',label:'LinkedIn'}]}/>
      <div className="lv-divider-text">{tr(lang,'hoặc dùng email','or use your email')}</div>
      <form style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}} onSubmit={(e)=>{e.preventDefault();setToast(tr(lang,'Đây là bản mẫu — chưa có tài khoản thật','Prototype only — no real accounts yet'));}}>
        <Field><Input label={tr(lang,'Email hoặc số điện thoại','Email or mobile')} type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/></Field>
        <Field><Input label={tr(lang,'Mật khẩu','Password')} type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••"/></Field>
        <div className="lv-form-row">
          <Check label={tr(lang,'Ghi nhớ đăng nhập','Remember me')} checked={remember} onChange={()=>setRemember(v=>!v)}/>
          <a href="#" onClick={e=>{e.preventDefault();setToast(tr(lang,'Liên kết đặt lại mật khẩu sẽ được gửi qua email','A reset link would be emailed to you'));}} style={{fontWeight:600}}>{tr(lang,'Quên mật khẩu?','Forgot password?')}</a>
        </div>
        <Button variant="primary" size="lg" style={{width:'100%',justifyContent:'center'}}>{tr(lang,'Đăng nhập','Login')}</Button>
      </form>
      <p className="lv-auth-note">{tr(lang,'Chưa có tài khoản?','No account yet?')}{' '}
        <a href="register.html" style={{fontWeight:700}}>{tr(lang,'Tạo tài khoản Người tìm việc','Create Job Seeker Account')}</a></p>
      <div className="lv-cross-auth">
        <strong>{tr(lang,'Bạn là nhà tuyển dụng?','Are you an employer?')}</strong>
        <a href="employer-login.html">{tr(lang,'Đến trang Đăng nhập Doanh nghiệp','Go to Employer Login')} <Icon name="arrow-right" size={14}/></a>
      </div>
    </AuthShell>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
    <Toast msg={toast}/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
