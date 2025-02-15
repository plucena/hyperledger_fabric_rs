var NS = 'agritech';





/* 
 * @param {agritech.product_creation} tx Create a new Product 
 * @transaction
 */
 async function productCreate(tx) {
     const pRegistry = await getAssetRegistry(NS + '.product')
  	 const e = getFactory().newResource(NS, 'product', tx.product_id)
     e.person_in_charge = tx.person_in_charge;
     e.date_time_start = tx.date_time_start;
     e.date_time_end = tx.date_time_end;
   
   if(tx.seasons !=null)
		e.seasons = tx.seasons;

     await pRegistry.add(e)
}

/* 
 * @param {agritech.delete_all} tx Create a new Product 
 * @transaction
 */
async function deleteAll() {
    try {
     const pRegistry = await getAssetRegistry(NS + '.field')
     var fields ;
     fields =  await pRegistry.getAll();
     await pRegistry.removeAll(fields);
    }catch(e){}
    try{
     const p1Registry = await getAssetRegistry(NS + '.analysis')
     var analysis ;
     analysis =  await p1Registry.getAll();
     await p1Registry.removeAll(analysis);
     }catch(e){}
    try{
     const p2Registry = await getAssetRegistry(NS + '.product')
     var products ;
     products =  await p2Registry.getAll();
     await p2Registry.removeAll(products);
    }catch(e){}
    try{
     const p3Registry = await getAssetRegistry(NS + '.season')
     var seasons ;
     seasons =  await p3Registry.getAll();
     await p3Registry.removeAll(seasons);
    }catch(e){}
    try{
     const p4Registry = await getAssetRegistry(NS + '.venue')
     var venues ;
     venues =  await p4Registry.getAll();
     await p4Registry.removeAll(venues);
    }catch(e){}
   try{
     const p5registry = await getParticipantRegistry(NS + '.company')
     var companies ;
     companies =  await p5registry.getAll();
     await p5registry.removeAll(companies);
    }catch(e){}
   try{
     const p6registry = await getParticipantRegistry(NS + '.laboratory')
     var labs ;
     labs =  await p6registry.getAll();
     await p6registry.removeAll(labs);
    }catch(e){}
	try{
     const p7registry = await getParticipantRegistry(NS + '.person_in_charge')
     var people ;
     labs =  await p7registry.getAll();
     await p7registry.removeAll(labs);
    }catch(e){} 
  try{
     const p8registry = await getParticipantRegistry(NS + '.company')
     var comp ;
     labs =  await p7registry.getAll();
     await p7registry.removeAll(comp);
    }catch(e){}

  
  
}

/* 
 * @param {agritech.product_push_season} tx Create a new Product Field
 * @transaction
 */
 async function productAddSeason(tx) {
  const pRegistry = await getAssetRegistry(NS + '.product')
  p1 = await pRegistry.get(tx.product_id);

    
  const rRegistry = await getAssetRegistry(NS + '.season');
  s1 = await rRegistry.get(tx.season_id);
  
  if(p1.seasons == null) {
     var tests = [];
    tests[0] = s1;
	p1.seasons = tests;
  }
  else p1.seasons.push(s1);
  await pRegistry.update(p1);

}


/* 
 * @param {agritech.field_creation} tx Create a new Product Field
 * @transaction
 */
 async function fieldCreate(tx) {
  const pRegistry = await getAssetRegistry(NS + '.field')
  const e = getFactory().newResource(NS, 'field', tx.field_id)
  e.field_description = tx.field_description
  e.person_in_charge = tx.person_in_charge;
  e.unit = tx.unit;
  e.unit_description = tx.unit_description;
  e.zone = tx.zone;
  e.zone_description = tx.zone_description;
  e.farm = tx.farm
  e.farm_description = tx.farm_description
  e.field = tx.field 
  //await person_history(tx.person_in_charge) 
  await pRegistry.add(e)
 }

/*
async function person_history(person_in_charge) {
  var v1 = null  
  const v1Registry = await getAssetRegistry(NS + '.person_history')
  try {
  v1 = await v1Registry.get(person_history.person_id) 
  }
  catch(e){}
  
  if(v1==null) {
      const v1= getFactory().newResource(NS, 'person_history', person_in_charge.person_id)
      v1.company = person_in_charge.company
      v1.name = person_in_charge.name
      v1.email = person_in_charge.email
      await v1Registry.add(v1);
  }
  else {
  		v1 = await v1Registry.get(person_history.person_id)
  }
    
  
  const v = getFactory().newConcept(NS, 'location')
  v.date_time = person_in_charge.date_time
  v.latitude = person_in_charge.latitude
  v.longitude = person_in_charge.longitude
  
 if(v1.locations==null) {
  var tests = [];
    tests[0] = v;
    v1.locations = tests
 }
 else
     v1.locations.push(v);
  
  await pRegistry.update(v1);
   
}
*/

/* 
 * @param {agritech.season_push_field} tx Create a new Product Field
 * @transaction
 */
 async function seasonAddField(tx) {
  const pRegistry = await getAssetRegistry(NS + '.field')
  e = await pRegistry.get(tx.field_id);

    
  const rRegistry = await getAssetRegistry(NS + '.season');
  p1 = await rRegistry.get(tx.season_id);
  
  if(p1.fields == null) {
     var tests = [];
    tests[0] = e;
	p1.fields = tests;
  }
  else p1.fields.push(e);
  await rRegistry.update(p1);

}


/* 
 * @param {agritech.season_creation} tx Create a new Product 
 * @transaction
 */
 async function seasonCreate(tx) {
  const pRegistry = await getAssetRegistry(NS + '.season')
  const e = getFactory().newResource(NS, 'season', tx.season_id)
  e.person_in_charge = tx.person_in_charge;
  e.date_time_start = tx.date_time_start;
  e.date_time_end = tx.date_time_end; 
  await pRegistry.add(e)
}



/* 
 * @param {agritech.season_push_field} tx Create a new Product Field
 * @transaction
 */
 async function seasonAddField(tx) {
  const pRegistry = await getAssetRegistry(NS + '.field')
  e = await pRegistry.get(tx.field_id);

    
  const rRegistry = await getAssetRegistry(NS + '.season');
  p1 = await rRegistry.get(tx.season_id);
  
  if(p1.fields == null) {
     var tests = [];
    tests[0] = e;
	p1.fields = tests;
  }
  else p1.fields.push(e);
  await rRegistry.update(p1);

}



/*
 * @param {agritech.season_push_analysis} tx Add Analysis to an Existing PP
 * @transaction
 */
async function seasonAnalysis(tx) {
  
  const aRegistry = await getAssetRegistry(NS + '.analysis')
  const v = getFactory().newResource(NS, 'analysis', tx.analysis_id)
  v.person_in_charge = tx.person_in_charge;
  v.sample_gathering_date = tx.sample_gathering_date;
  v.analysis_date = tx.analysis_date;
  v.contract_id = tx.contract_id;
  v.images = tx.images;
  v.storage_device = tx.storage_device;
  v.laboratory = tx.laboratory;
  v.approval = tx.approval;
  v.fields = tx.fields;
  v.log = tx.log;
  await aRegistry.add(v);
  
  const p2Registry = await getAssetRegistry(NS + '.season');
  p1 = await p2Registry.get(tx.season_id);
  
  if(p1.analysis == null) {
     var tests = [];
    tests[0] = v;
	p1.analysis = tests;
  }
  else p1.analysis.push(v);
  await p2Registry.update(p1);

}



/*
 * @param {agritech.season_push_input_application} tx
 * @transaction
 */
async function seasonlAddInput(tx) {
  
  const v = getFactory().newConcept(NS, 'input_application')
  v.input_application_id = tx.input_application_id;
  v. person_in_charge = tx.person_in_charge;
  v.date_time = tx.date_time;  
  v.storage_device = tx.storage_device;
  v.input = tx.input;
  v.log = tx.log;

    
  const pRegistry = await getAssetRegistry(NS + '.season');
  p1 = await pRegistry.get(tx.season_id);
  if(p1.input_applications == null) {
     var tests = [];
    tests[0] = v;
	p1.input_applications = tests;
  }
  else p1.input_applications.push(v);
  await pRegistry.update(p1);

}

/*
 * @param {agritech.season_push_transport} tx
 * @transaction
 */
async function seasonPushTransport(tx) {
  
  const v = getFactory().newConcept(NS, 'transport')
  v.transport_id = tx.transport_id;
  v.person_in_charge = tx.person_in_charge;
  v.contract_id = tx.contract_id;
  v.transport_date = tx.transport_date;
  v.origin = tx.origin;
  v.destination = tx.destination;
  v.log = tx.log;

  const pRegistry = await getAssetRegistry(NS + '.season');
  p1 = await pRegistry.get(tx.season_id);
  if(p1.transports == null) {
     var tests = [];
    tests[0] = v;
	p1.transports = tests;
  }
  else p1.transports.push(v);
  await pRegistry.update(p1);  

}


/*
 * @param {agritech.venue_creation} tx
 * @transaction
 */
async function venueCreate(tx) {
    const pRegistry = await getAssetRegistry(NS + '.venue')
    const v = getFactory().newResource(NS, 'venue', tx.venue_id)
    v.person_in_charge = tx.person_in_charge;
    const rRegistry = await getParticipantRegistry(NS + '.company');
    p1 = await rRegistry.get(tx.company_id);
    if(p1!=null)
    	v.company= p1;
    v.zone_id = tx.zone_id;       
    await pRegistry.add(v);
}


   
