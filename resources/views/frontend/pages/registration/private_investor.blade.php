
  @extends('frontend/layouts/account_layout')


@section('content')

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="onboard-wrapper">
    <div class="container main-steps-container">
        <ul class="list-unstyled main-steps-list">
            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Sign up</span>
            </li>

            <li class="success">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Verify email</span>
            </li>

            <li class="current">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Contact info</span>
            </li>

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Identity verification</span>
            </li>

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Investor profile</span>
            </li>

            <li class="">
                <div class="divider"></div>
                <span class="badge-wrapper">
                    <i class="icon"></i>
                </span>

                <span class="steps-name">Appropriateness Questionnaire</span>
            </li>
        </ul>
    </div>
    <h1 class="text-center mt-4 mb-0">
        Contact Info
    </h1>

    <div class="onboarding-tab-wrapper" data-select2-id="224">
        <ul class="nav nav-tabs onboarding-tab" id="onboardReg" role="tablist">
            <li class="nav-item">
                <a class="nav-link active show"  href="{{URL::to('')}}/tetenter/private_investor">
                    Private Investor
                    <div class="ripple-container"></div>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link "  href="{{URL::to('')}}/tetenter/company_representer">
                    Company representative
                    <div class="ripple-container"></div>
                </a>
            </li>
        </ul>

       

        <form action="{{URL::to('')}}/tetenter/private_investor" method="post" class="onboarding-form" enctype="multipart/form-data">
          

            <div class="tab-content" id="registerTab">
                <div class="tab-pane fade active show" id="private-investor" role="tabpanel" aria-labelledby="onboard-reg-tab">
                    <div class="row">
                        <div class="col-4 col-md-3">
                            <div class="form-group">
                                <label for="gender" class="bmd-label-floating">
                                    Title
                                </label>
                                <select name="gender" id="gender" class="form-control" >
                                    <option value="MALE">Mr</option>
                                    <option value="FEMALE">Mrs</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-8 col-md-9">
                            <div class="form-group bmd-form-group">
                                <label for="firstName" class="bmd-label-floating main-label">
                                    First name
                                </label>

                                <input type="text" name="fname" class="form-control main-input"  />
                            </div>
                        </div>
                    </div>

                    <div class="form-group bmd-form-group">
                        <label for="lastName" class="bmd-label-floating main-label">
                            Last name
                        </label>
                        <input type="text" name="lname" class="form-control main-input" />
                    </div>

                    <div class="form-group bmd-form-group is-filled">
                        <label for="userCountry" class="bmd-label-floating main-label">
                            Residence Country
                        </label>
                        <select name="country" class="form-control" >
                            <option value="">Please select...</option>
                            <option value="+93">Afghanistan</option>
                            <option value="+355">Albania</option>
                            <option value="+213">Algeria</option>
                            <option value="+376">Andorra</option>
                            <option value="+244">Angola</option>
                            <option value="+1268">Antigua &amp; Barbuda</option>
                            <option value="+54">Argentina</option>
                            <option value="+374">Armenia</option>
                            <option value="+61">Australia</option>
                            <option value="+43">Austria</option>
                            <option value="+994">Azerbaijan</option>
                            <option value="+1242">Bahamas</option>
                            <option value="+973">Bahrain</option>
                            <option value="+880">Bangladesh</option>
                            <option value="+1246">Barbados</option>
                            <option value="+375">Belarus</option>
                            <option value="+32">Belgium</option>
                            <option value="+501">Belize</option>
                            <option value="+229">Benin</option>
                            <option value="+975">Bhutan</option>
                            <option value="+591">Bolivia</option>
                            <option value="+387">Bosnia and Herzegovina</option>
                            <option value="+387">Bosnia and Herzegovina</option>
                            <option value="+267">Botswana</option>
                            <option value="+55">Brazil</option>
                            <option value="+673">Brunei</option>
                            <option value="+359">Bulgaria</option>
                            <option value="+226">Burkina Faso</option>
                            <option value="+257">Burundi</option>
                            <option value="+855">Cambodia</option>
                            <option value="+237">Cameroon</option>
                            <option value="+1">Canada</option>
                            <option value="+238">Cape Verde</option>
                            <option value="+236">Central African Republic</option>
                            <option value="+235">Chad</option>
                            <option value="+56">Chile</option>
                            <option value="+86">China</option>
                            <option value="+57">Colombia</option>
                            <option value="+269">Comoros</option>
                            <option value="+242">Congo</option>
                            <option value="+243">Congo Democratic Republic</option>
                            <option value="+506">Costa Rica</option>
                            <option value="">Cote d'Ivoire</option>
                            <option value="+385">Croatia</option>
                            <option value="+53">Cuba</option>
                            <option value="+357">Cyprus</option>
                            <option value="+420">Czech Republic</option>
                            <option value="+45">Denmark</option>
                            <option value="+253">Djibouti</option>
                            <option value="+1767">Dominica</option>
                            <option value="+1809">Dominican Republic</option>
                            <option value="+593">Ecuador</option>
                            <option value="+20">Egypt</option>
                            <option value="+503">El Salvador</option>
                            <option value="+240">Equatorial Guinea</option>
                            <option value="+291">Eritrea</option>
                            <option value="+372">Estonia</option>
                            <option value="+251">Ethiopia</option>
                            <option value="+679">Fiji</option>
                            <option value="+358">Finland</option>
                            <option value="+33">France</option>
                            <option value="+689">French Polynesia</option>
                            <option value="+241">Gabon</option>
                            <option value="+220">Gambia</option>
                            <option value="+995">Georgia</option>
                            <option value="+49">Germany</option>
                            <option value="+233">Ghana</option>
                            <option value="+30">Greece</option>
                            <option value="+1473">Grenada</option>
                            <option value="+502">Guatemala</option>
                            <option value="+224">Guinea</option>
                            <option value="+245">Guinea-Bissau</option>
                            <option value="+595">Guyana</option>
                            <option value="+509">Haiti</option>
                            <option value="+504">Honduras</option>
                            <option value="+852">Hong Kong</option>
                            <option value="+36">Hungary</option>
                            <option value="+354">Iceland</option>
                            <option value="+91">India</option>
                            <option value="+62">Indonesia</option>
                            <option value="+98">Iran</option>
                            <option value="+964">Iraq</option>
                            <option value="+353">Ireland</option>
                            <option value="+972">Israel</option>
                            <option value="+39">Italy</option>
                            <option value="+1876">Jamaica</option>
                            <option value="+81">Japan</option>
                            <option value="+962">Jordan</option>
                            <option value="+77">Kazakhstan</option>
                            <option value="+254">Kenya</option>
                            <option value="+686">Kiribati</option>
                            <option value="+850">Korea North</option>
                            <option value="+383">Kosovo</option>
                            <option value="+383">Kosovo</option>
                            <option value="+965">Kuwait</option>
                            <option value="+996">Kyrgyzstan</option>
                            <option value="+856">Laos</option>
                            <option value="+371">Latvia</option>
                            <option value="+961">Lebanon</option>
                            <option value="+266">Lesotho</option>
                            <option value="+231">Liberia</option>
                            <option value="+218">Libya</option>
                            <option value="+423">Liechtenstein</option>
                            <option value="+370">Lithuania</option>
                            <option value="+352">Luxembourg</option>
                            <option value="+853">Macao</option>
                            <option value="+389">Macedonia</option>
                            <option value="+261">Madagascar</option>
                            <option value="+265">Malawi</option>
                            <option value="+60">Malaysia</option>
                            <option value="+960">Maldives</option>
                            <option value="+223">Mali</option>
                            <option value="+356">Malta</option>
                            <option value="+692">Marshall Islands</option>
                            <option value="+222">Mauritania</option>
                            <option value="+230">Mauritius</option>
                            <option value="+52">Mexico</option>
                            <option value="+691">Micronesia</option>
                            <option value="+373">Moldova</option>
                            <option value="+377">Monaco</option>
                            <option value="+976">Mongolia</option>
                            <option value="+382">Montenegro</option>
                            <option value="+212">Morocco</option>
                            <option value="">Mozambique</option>
                            <option value="+95">Myanmar (Burma)</option>
                            <option value="+264">Namibia</option>
                            <option value="+674">Nauru</option>
                            <option value="+977">Nepal</option>
                            <option value="+31">Netherlands</option>
                            <option value="+64">New Zealand</option>
                            <option value="+505">Nicaragua</option>
                            <option value="+227">Niger</option>
                            <option value="+234">Nigeria</option>
                            <option value="+47">Norway</option>
                            <option value="+968">Oman</option>
                            <option value="+92">Pakistan</option>
                            <option value="+680">Palau</option>
                            <option value="+507">Panama</option>
                            <option value="+675">Papua New Guinea</option>
                            <option value="+595">Paraguay</option>
                            <option value="+51">Peru</option>
                            <option value="+63">Philippines</option>
                            <option value="+48">Poland</option>
                            <option value="+351">Portugal</option>
                            <option value="+974">Qatar</option>
                            <option value="+40">Romania</option>
                            <option value="+7">Russia</option>
                            <option value="+7">Russia</option>
                            <option value="+250">Rwanda</option>
                            <option value="+685">Samoa</option>
                            <option value="+378">San Marino</option>
                            <option value="">Sao Tome &amp; Principe</option>
                            <option value="+966">Saudi Arabia</option>
                            <option value="+221">Senegal</option>
                            <option value="+381">Serbia</option>
                            <option value="+248">Seychelles</option>
                            <option value="+232">Sierra Leone</option>
                            <option value="+65">Singapore</option>
                            <option value="+421">Slovakia</option>
                            <option value="+386">Slovenia</option>
                            <option value="+677">Solomon Islands</option>
                            <option value="">Somalia</option>
                            <option value="+27">South Africa</option>
                            <option value="+82">South Korea</option>
                            <option value="+211">South Sudan</option>
                            <option value="+249">South Sudan</option>
                            <option value="+34">Spain</option>
                            <option value="+94">Sri Lanka</option>
                            <option value="+1869">St. Kitts &amp; Nevis</option>
                            <option value="">St. Lucia</option>
                            <option value="">St. Vincent &amp; The Grenadines</option>
                            <option value="+597">Suriname</option>
                            <option value="+268">Swaziland</option>
                            <option value="+46">Sweden</option>
                            <option value="+41">Switzerland</option>
                            <option value="+963">Syria</option>
                            <option value="+886">Taiwan</option>
                            <option value="+992">Tajikistan</option>
                            <option value="+255">Tanzania</option>
                            <option value="+66">Thailand</option>
                            <option value="+228">Togo</option>
                            <option value="+676">Tonga</option>
                            <option value="+1868">Trinidad &amp; Tobago</option>
                            <option value="+216">Tunisia</option>
                            <option value="+90">Turkey</option>
                            <option value="+993">Turkmenistan</option>
                            <option value="+688">Tuvalu</option>
                            <option value="+44">UK</option>
                            <option value="+256">Uganda</option>
                            <option value="+380">Ukraine</option>
                            <option value="+971">United Arab Emirates</option>
                            <option value="+1">United States of America</option>
                            <option value="+598">Uruguay</option>
                            <option value="+998">Uzbekistan</option>
                            <option value="+678">Vanuatu</option>
                            <option value="">Vatican City (Holy See)</option>
                            <option value="+58">Venezuela</option>
                            <option value="+84">Vietnam</option>
                            <option value="+967">Yemen</option>
                            <option value="+260">Zambia</option>
                            <option value="+263">Zimbabwe</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div class="form-group bmd-form-group">
                        <label for="residenceAddress" class="bmd-label-floating main-label">
                            Residence address
                        </label>
                        <input type="text" name="residencea_address" class="form-control" placeholder="" />
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group bmd-form-group mobile-number">
                                <label class="bmd-label-floating main-label" style="padding-left: 40px;" id="lblUserCountry" for="mobileNumber">Mobile number</label>
                                <input type="text" class="form-control main-input" style="padding-left: 40px;" name="mobile" maxlength="12" value="" autocomplete="off" />
                            </div>
                        </div>

                        <!--    <div class="col-sm-6">
                    <div class="form-group bmd-form-group is-filled">
                        <div class="clearfix checkbox pt-2">
                            <label class="float-left">
                                <input type="checkbox" name="twoStepAuth" value="true"><span class="checkbox-decorator"><span class="check"></span></span>
                                Enable 2-step auth
                            </label>
                        </div>
                        <button type="button" class="btn-action btn-action-primary input-right-btn tooltips-initialized" data-toggle="tooltip" data-placement="top" title="" data-original-title="Two-step verification is a process that involves two authentication methods during investment.">
                            <i class="zmdi zmdi-info-outline"></i>
                        </button>
                    </div>
                </div> -->
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group bmd-form-group">
                                <label for="signUpPromotionCode" class="bmd-label-floating main-label">
                                    Referral Code
                                </label>
                                <input type="text" name="referal_code" class="form-control main-input" value="" autocomplete="nope"  />
                             
                            </div>
                        </div>
                    </div>

                    <input type="hidden" name="isPrivateInvestor" id="isPrivateInvestor" value="true" />
                    <input type="hidden" name="isInvestor" id="isInvestor" value="true" />
<!-- 
                    <div class="form-group" id="divDocumentMemberOfBoardError" style="display: none;">
                        <div id="divDocumentMemberOfBoard"></div>
                        <input type="hidden" name="memberOfBoardFileHidden" value="" id="memberOfBoardFileHidden" />
                    </div> -->
                    <div class="section-describtion" id="divUploadDocInfo" style="display: none;">
                        <p>* Parts of our verification process are conducted manually. In order to speed up this process, we recommend uploading documents in English.</p>
                    </div>
                </div>
            </div>

            

            

            <div class="form-group pt-5">
                <a class="btn btn-cta-o btn-xl-mob mb-3">Come back later</a>
                

               <button type="submit" class="btn btn-cta-o btn-xl-mob mb-3">Submit</button>
    
            </div>
        </form>
    </div>
</div>



@stop
   

